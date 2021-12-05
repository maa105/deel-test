/**
 * @typedef AllModelsMap
 * @type {Object}
 * @property {import('./Contract').ContractModel} Contract
 * @property {import('./Job').JobModel} Job
 * @property {import('./Profile').ProfileModel} Profile
 */

/**
 * @param {import('sequelize').Sequelize} sequelize - the sequelize instance
 */
const defineModels = (sequelize, options = { noIndexes: false }) => {
  const modules = {
    Contract: require("./Contract.js"),
    Job: require("./Job.js"),
    Profile: require("./Profile.js"),
  };

  const models = {
    Contract: modules.Contract.define(sequelize, options),
    Job: modules.Job.define(sequelize, options),
    Profile: modules.Profile.define(sequelize, options),
  };

  modules.Contract.link(models, options);
  modules.Job.link(models, options);
  modules.Profile.link(models, options);

  return models;
};
exports.define = defineModels;
