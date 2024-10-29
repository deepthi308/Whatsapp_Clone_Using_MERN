const app = require("./app");
require("dotenv").config();

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server has started listening at http://localhost:${PORT}...`);
});
