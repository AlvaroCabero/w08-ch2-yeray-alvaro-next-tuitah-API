const connectDB = require("./database");
const initializeServer = require("./server");
const { generalErrorHandler } = require("./middlewares/errors");

require("dotenv").config();

const port = process.env.SERVER_PORT ?? 5000;

(async () => {
  try {
    await connectDB();
    initializeServer(5000);
  } catch (error) {
    generalErrorHandler;
  }
})();
