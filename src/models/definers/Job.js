/**
 * @typedef JobAttributes
 * @type {Object}
 * @property {Number} [id]
 * @property {String} description
 * @property {Number} price
 * @property {Boolean} [paid]
 * @property {Date} [paymentDate]
 * @property {Number} [ContractId]
 */

/**
 * @typedef JobCreationAttributes
 * @type {Object}
 * @property {Number} [id]
 * @property {String} description
 * @property {Number} price
 * @property {Boolean} [paid]
 * @property {Date} [paymentDate]
 * @property {Number} [ContractId]
 */

/**
 * @callback GetContractCallback
 * @returns {Promise<import('./Contract').ContractInstance>}
 */

/**
 * @typedef JobLinks
 * @type {Object}
 * @property {GetContractCallback} getContract
 */

/**
 * @typedef JobInstance
 * @type {import('sequelize').Model<JobAttributes, JobCreationAttributes> & JobAttributes & JobLinks}
 */

/**
 * @typedef JobModel
 * @type {import('sequelize').ModelCtor<JobInstance>}
 */

const getModelDefenition = require("./helper").getModelDefenition;

/**
 * @param {import('sequelize').Sequelize} sequelize - the sequelize instance
 * @returns {JobModel} - Job model
 */
const defineJob = (sequelize, options = { noIndexes: false }) => {
  const [modelName, modelAttributes, modelOptions] = getModelDefenition(
    sequelize,
    "Job"
  );
  return sequelize.define(modelName, modelAttributes, {
    ...modelOptions,
    indexes: options.noIndexes ? [] : modelOptions.indexes,
  });
};
exports.define = defineJob;

/**
 * @param {import('./index').AllModelsMap} models - all models
 */
exports.link = (models) => {
  const Job = models.Job;
  Job.belongsTo(models.Contract, { foreignKey: "ContractId" });
};
