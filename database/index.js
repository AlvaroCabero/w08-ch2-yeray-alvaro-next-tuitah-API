require("dotenv").config();
const debug = require("debug")("tuitah:database");
const chalk = require("chalk");
const mongoose = require("mongoose");

const connectDB = () =>
  new Promise((resolve, reject) => {
    // mongoose.set("debug", true);
    // mongoose.set("toJSON", {
    //   virtuals: true,
    //   transform: (doc, ret) => {
    //     delete ret._id;
    //     delete ret.__v;
    //   },
    // });
    //Los virtuals son propiedades que dependen de otras propiedades o que
    //mongoose nos ha hecho aparecer. Por ejemplo, en un input de edad, un virtual
    //seria isMajorAge: true, el cual depende de la edad y el usuario no
    //lo pone directameente

    mongoose.connect(process.env.MONGODB_TUITAH, (error) => {
      if (error) {
        debug(chalk.red("Database connection not possible."));
        debug(chalk.red(error.message));
        reject(error);
      }
      debug(chalk.green("Connected to Tuitah database"));
      resolve();
    });

    mongoose.connection.on("close", () => {
      debug(chalk.magenta("Desconectado de la DB"));
    });
  });

module.exports = connectDB;
