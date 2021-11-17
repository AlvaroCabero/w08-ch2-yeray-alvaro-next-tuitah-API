require("dotenv").config();
const express = require("express");
const debug = require("debug")("tuitah:server");
const chalk = require("chalk");
const morgan = require("morgan");
const cors = require("cors");
const {
  generalErrorHandler,
  notFoundErrorHandler,
} = require("./middlewares/errors");

const app = express();

const serveRoutes = () => {
  app.use(cors());
  app.use(morgan("dev"));
  app.use(express.json());

  // app.use("/user", usersRoutes);

  app.use(notFoundErrorHandler);
  app.use(generalErrorHandler);
};

const initializeServer = (port) => {
  console.log(port);
  new Promise((resolve, reject) => {
    const server = app.listen(port, () => {
      debug(chalk.yellow(`Running in port ${port}`));
    });

    server.on("error", (error) => {
      debug(chalk.red("Initialize the server has not been possible."));
      if (error.code === "EADDRINUSE") {
        debug(chalk.red(`The port ${port} is already being used.`));
      }
      reject();
    });

    server.on("close", () => {
      debug(chalk.magenta("Servidor desconectado"));
    });
    serveRoutes();
    resolve(server);
  });
};

module.exports = initializeServer;
