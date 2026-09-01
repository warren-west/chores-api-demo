# Chores API

A small Express.js backend for managing chores, backed by an in-memory array.

## Setup

```bash
npm install
npm start
```

The server runs on `http://localhost:3000` by default (set `PORT` to override).

## Endpoints

### General

- `GET /` — index endpoint, returns a welcome message.
- `GET /health` — health check, returns a status message.

### Chores (`/chores`)

- `GET /chores` — list all chores. Optional query params: `category`, `urgency` (`high`|`medium`|`low`), `isDone` (`true`|`false`).
- `GET /chores/:id` — get a single chore by id.
- `POST /chores` — create a chore. Body: `{ name, category, urgency, isDone }`.
- `PUT /chores/:id` — fully replace a chore. Body: `{ name, category, urgency, isDone }`.
- `PATCH /chores/:id` — partially update a chore. Body: any subset of `{ name, category, urgency, isDone }`.
- `DELETE /chores/:id` — delete a chore by id.

### Chore shape

```json
{
  "id": 1,
  "name": "Wash the dishes",
  "category": "Kitchen",
  "urgency": "high",
  "isDone": false
}
```
