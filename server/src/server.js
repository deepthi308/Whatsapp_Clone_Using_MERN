const app = require("./app");
const logger = require("./configs/logger.config");

const PORT = process.env.PORT || 8000;
console.log(process.env.NODE_ENV);
app.listen(PORT, () => {
  logger.info(`Server has started listening at http://localhost:${PORT}...`);
});
