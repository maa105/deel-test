const withClient = require("../../../middleware/withClient");
const withNumber = require("../../../middleware/withNumber");
const withStartAndEndDates = require("../../../middleware/withStartEndDates");
const errorGuardMiddleware = require("../../../middleware/errorGuardMiddleware");

const {
  depositMoneyToClientBalance,
  getBestProfession,
  getBestClients,
} = require("../controllers/admin.external.controller");

/**
 * @param {import('express').Application} app
 */
const registerRoutes = (app) => {
  app.post(
    "/balances/deposit/:userId",
    withNumber("body", "amount", {
      required: true,
      min: 0,
      excludeMin: true,
      errorMessages: {
        invalid: "Invalid amount specified",
        required: "No amount specified",
        min: "Invalid amount must be > 0",
      },
    }),
    withClient("params", "userId"),
    errorGuardMiddleware(depositMoneyToClientBalance)
  );

  app.get(
    "/admin/best-profession",
    withStartAndEndDates(true),
    errorGuardMiddleware(getBestProfession)
  );

  app.get(
    "/admin/best-clients",
    withStartAndEndDates(true),
    withNumber("query", "limit", {
      required: true,
      default: 2,
      min: 1,
      errorMessages: {
        invalid: "Invalid limit specified",
        min: "Limit must be > 0",
      },
    }),
    errorGuardMiddleware(getBestClients)
  );
};

exports.registerRoutes = registerRoutes;
