const express = require("express");
const router = express.Router();

// Allowed urgency levels
const URGENCY_LEVELS = ["high", "medium", "low"];

// In-memory "database"
let chores = [
  {
    id: 1,
    name: "Wash the dishes",
    category: "Kitchen",
    urgency: "high",
    isDone: false,
  },
  {
    id: 2,
    name: "Vacuum the living room",
    category: "Cleaning",
    urgency: "medium",
    isDone: false,
  },
  {
    id: 3,
    name: "Take out the trash",
    category: "Outdoor",
    urgency: "high",
    isDone: true,
  },
  {
    id: 4,
    name: "Water the plants",
    category: "Garden",
    urgency: "low",
    isDone: false,
  },
];

// Helper to generate the next id
let nextId = chores.length + 1;

// Helper to validate a chore payload
function validateChorePayload(payload, { partial = false } = {}) {
  const errors = [];
  const { name, category, urgency, isDone } = payload;

  if (!partial || name !== undefined) {
    if (typeof name !== "string" || name.trim() === "") {
      errors.push("'name' is required and must be a non-empty string.");
    }
  }

  if (!partial || category !== undefined) {
    if (typeof category !== "string" || category.trim() === "") {
      errors.push("'category' is required and must be a non-empty string.");
    }
  }

  if (!partial || urgency !== undefined) {
    if (!URGENCY_LEVELS.includes(urgency)) {
      errors.push(`'urgency' must be one of: ${URGENCY_LEVELS.join(", ")}.`);
    }
  }

  if (!partial || isDone !== undefined) {
    if (typeof isDone !== "boolean") {
      errors.push("'isDone' must be a boolean.");
    }
  }

  return errors;
}

// GET /chores - list all chores (supports optional filtering)
router.get("/", (req, res) => {
  const { category, urgency, isDone } = req.query;
  let result = chores;

  if (category) {
    result = result.filter(
      (chore) => chore.category.toLowerCase() === category.toLowerCase()
    );
  }

  if (urgency) {
    result = result.filter((chore) => chore.urgency === urgency);
  }

  if (isDone !== undefined) {
    const isDoneBool = isDone === "true";
    result = result.filter((chore) => chore.isDone === isDoneBool);
  }

  res.json({ message: "Chores retrieved successfully", data: result });
});

// GET /chores/:id - get a single chore
router.get("/:id", (req, res) => {
  const id = Number(req.params.id);
  const chore = chores.find((c) => c.id === id);

  if (!chore) {
    return res.status(404).json({ message: `Chore with id ${id} not found` });
  }

  res.json({ message: "Chore retrieved successfully", data: chore });
});

// POST /chores - create a new chore
router.post("/", (req, res) => {
  const errors = validateChorePayload(req.body);

  if (errors.length > 0) {
    return res.status(400).json({ message: "Validation failed", errors });
  }

  const { name, category, urgency, isDone } = req.body;

  const newChore = {
    id: nextId++,
    name,
    category,
    urgency,
    isDone,
  };

  chores.push(newChore);

  res.status(201).json({ message: "Chore created successfully", data: newChore });
});

// PUT /chores/:id - fully update an existing chore
router.put("/:id", (req, res) => {
  const id = Number(req.params.id);
  const choreIndex = chores.findIndex((c) => c.id === id);

  if (choreIndex === -1) {
    return res.status(404).json({ message: `Chore with id ${id} not found` });
  }

  const errors = validateChorePayload(req.body);

  if (errors.length > 0) {
    return res.status(400).json({ message: "Validation failed", errors });
  }

  const { name, category, urgency, isDone } = req.body;

  chores[choreIndex] = { id, name, category, urgency, isDone };

  res.json({ message: "Chore updated successfully", data: chores[choreIndex] });
});

// PATCH /chores/:id - partially update an existing chore
router.patch("/:id", (req, res) => {
  const id = Number(req.params.id);
  const choreIndex = chores.findIndex((c) => c.id === id);

  if (choreIndex === -1) {
    return res.status(404).json({ message: `Chore with id ${id} not found` });
  }

  const errors = validateChorePayload(req.body, { partial: true });

  if (errors.length > 0) {
    return res.status(400).json({ message: "Validation failed", errors });
  }

  chores[choreIndex] = { ...chores[choreIndex], ...req.body, id };

  res.json({ message: "Chore updated successfully", data: chores[choreIndex] });
});

// DELETE /chores/:id - delete a chore
router.delete("/:id", (req, res) => {
  const id = Number(req.params.id);
  const choreIndex = chores.findIndex((c) => c.id === id);

  if (choreIndex === -1) {
    return res.status(404).json({ message: `Chore with id ${id} not found` });
  }

  const [deletedChore] = chores.splice(choreIndex, 1);

  res.json({ message: "Chore deleted successfully", data: deletedChore });
});

module.exports = router;
