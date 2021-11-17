const connectDB = require("./database");
const initializeServer = require("./server");
const { generalErrorHandler } = require("./server/middlewares/errors");

require("dotenv").config();

const port = process.env.PORT ?? process.env.SERVER_PORT ?? 5000;

(async () => {
  try {
    await connectDB();
    initializeServer(port);
  } catch (error) {
    generalErrorHandler;
  }
})();
