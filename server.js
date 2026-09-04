const app = require('./index')

const PORT = process.env.PORT || 3000;

// serve the app on PORT
app.listen(PORT, () => {
  console.log(`Chores API listening on http://localhost:${PORT}`);
});