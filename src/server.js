const { connect, loadModels } = require("./models");
const http = require("http");
const AbortController = require("abort-controller").AbortController;

const start = async () => {
  try {
    await connect({
      dialect: "sqlite",
      storage: "./database.sqlite3",
    });
    loadModels();

    const { createApp } = require("./app");
    const abortSignal = new AbortController();
    process.on("beforeExit", () => abortSignal.abort());
    return new Promise((resolve, reject) => {
      const app = createApp();
      http
        .createServer(app)
        .listen(
          {
            port: 3001,
            signal: abortSignal,
          },
          () => {
            // eslint-disable-next-line no-console
            console.log("Express App Listening on Port 3001");
            resolve(abortSignal);
            reject = () => {};
          }
        )
        .on("error", (err) => {
          reject(err);
        });
    });
  } catch (error) {
    console.error(`An error occurred: ${JSON.stringify(error)}`);
    console.error(error);
    process.exit(1);
  }
};

exports.start = start;
