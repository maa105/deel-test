const isDev = process.env.NODE_ENV === "development";

/**
 * @param {import('express').RequestHandler} middleware
 * @returns {import('express').RequestHandler}
 */
const errorGuardMiddleware =
  (middleware) =>
  async (...args) => {
    const res = args[1];
    try {
      await middleware(...args);
    } catch (err) {
      if (!res.headersSent) {
        if (isDev) {
          res.status(500).end(
            JSON.stringify({
              message: err.message,
              stack: err.stack,
            })
          );
        } else {
          console.error(err);
          res.status(500).end();
        }
      }
      console.error("Unhandled error on request", err);
    }
  };

module.exports = errorGuardMiddleware;
