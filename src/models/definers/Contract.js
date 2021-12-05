/**
 * @typedef ContractAttributes
 * @type {Object}
 * @property {Number} [id]
 * @property {String} terms
 * @property {String} [status]
 * @property {Number} [ContractorId]
 * @property {Number} [ClientId]
 */

/**
 * @typedef ContractCreationAttributes
 * @type {Object}
 * @property {Number} [id]
 * @property {String} terms
 * @property {String} [status]
 * @property {Number} [ContractorId]
 * @property {Number} [ClientId]
 */

/**
 * @callback GetContractorCallback
 * @returns {Promise<import('./Profile').ProfileInstance>}
 */

/**
 * @callback GetClientCallback
 * @returns {Promise<import('./Profile').ProfileInstance>}
 */

/**
 * @callback GetJobsCallback
 * @returns {Promise<Array<import('./Job').JobInstance>>}
 */

/**
 * @typedef ContractLinks
 * @type {Object}
 * @property {GetContractorCallback} getContractorProfile
 * @property {GetClientCallback} getClientProfile
 * @property {GetJobsCallback} getJobs
 */

/**
 * @typedef ContractInstance
 * @type {import('sequelize').Model<ContractAttributes, ContractCreationAttributes> & ContractAttributes & ContractLinks}
 */

/**
 * @typedef ContractModel
 * @type {import('sequelize').ModelCtor<ContractInstance>}
 */

const getModelDefenition = require("./helper").getModelDefenition;

/**
 * @param {import('sequelize').Sequelize} sequelize - the sequelize instance
 * @returns {ContractModel} - Contract model
 */
const defineContract = (sequelize, options = { noIndexes: false }) => {
  const [modelName, modelAttributes, modelOptions] = getModelDefenition(
    sequelize,
    "Contract"
  );
  return sequelize.define(modelName, modelAttributes, {
    ...modelOptions,
    indexes: options.noIndexes ? [] : modelOptions.indexes,
  });
};
exports.define = defineContract;

/**
 * @param {import('./index').AllModelsMap} models - all models
 */
exports.link = (models) => {
  const Contract = models.Contract;
  Contract.belongsTo(models.Profile, {
    foreignKey: "ContractorId",
    as: "Contractor",
  });
  Contract.belongsTo(models.Profile, { foreignKey: "ClientId", as: "Client" });
  Contract.hasMany(models.Job, { foreignKey: "ContractId" });
};
