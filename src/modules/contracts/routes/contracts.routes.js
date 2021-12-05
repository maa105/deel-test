const getProfile = require("../../../middleware/getProfile");
const errorGuardMiddleware = require("../../../middleware/errorGuardMiddleware");

const {
  getMyContract,
  getMyNonterminatedContracts,
} = require("../controllers/contract.external.controller");

/**
 * @param {import('express').Application} app
 */
const registerRoutes = (app) => {
  app.get(
    "/contracts/:contractId",
    getProfile,
    errorGuardMiddleware(getMyContract)
  );

  app.get(
    "/contracts",
    getProfile,
    errorGuardMiddleware(getMyNonterminatedContracts)
  );
};

exports.registerRoutes = registerRoutes;
