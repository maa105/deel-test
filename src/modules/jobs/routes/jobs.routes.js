const getProfile = require("../../../middleware/getProfile");
const errorGuardMiddleware = require("../../../middleware/errorGuardMiddleware");

const {
  getUnpaidAndActiveJobs,
  payJob,
} = require("../controllers/jobs.external.controller");

/**
 * @param {import('express').Application} app
 */
const registerRoutes = (app) => {
  app.get(
    "/jobs/unpaid",
    getProfile,
    errorGuardMiddleware(getUnpaidAndActiveJobs)
  );

  app.post("/jobs/:jobId/pay", getProfile, errorGuardMiddleware(payJob));
};

exports.registerRoutes = registerRoutes;
