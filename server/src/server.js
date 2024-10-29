const app = require("./app");

const PORT = process.env.PORT || 8000;
console.log(process.env.NODE_ENV);
app.listen(PORT, () => {
  console.log(`Server has started listening at http://localhost:${PORT}...`);
});
