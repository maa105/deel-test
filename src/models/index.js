const { Sequelize } = require("sequelize");

/** @type {Sequelize} */
let sequelize;

/**
 * @param {import('sequelize').Options} options
 * @returns {Promise<Sequelize>}
 */
const connect = async (options) => {
  if (sequelize) {
    return sequelize;
  }
  sequelize = new Sequelize(options);
  exports.sequelize = sequelize;

  await sequelize.authenticate();
  return sequelize;
};
exports.connect = connect;

/** @type {Sequelize} */
exports.sequelize = sequelize;

/** @type {import('./definers').AllModelsMap} */
let models;
/**
 * @param {Sequelize} sequelize - the sequelize instance
 */
exports.loadModels = (options = { noIndexes: false }) => {
  if (models) {
    throw new Error("Models already loaded");
  }
  models = require("./definers").define(sequelize, options);
  exports.models = models;
  return models;
};

/** @type {import('./definers').AllModelsMap} */
exports.models = models;
