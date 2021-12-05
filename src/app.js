const express = require("express");
const bodyParser = require("body-parser");

const createApp = () => {
  const app = express();
  app.use(bodyParser.json());

  const {
    registerRoutes: registerAdminRoutes,
  } = require("./modules/admin/routes/admin.routes");

  const {
    registerRoutes: registerContractsRoutes,
  } = require("./modules/contracts/routes/contracts.routes");

  const {
    registerRoutes: registerJobsRoutes,
  } = require("./modules/jobs/routes/jobs.routes");

  registerAdminRoutes(app);
  registerContractsRoutes(app);
  registerJobsRoutes(app);

  return app;
};
exports.createApp = createApp;
