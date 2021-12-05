/**
 * @typedef ProfileAttributes
 * @type {Object}
 * @property {Number} [id]
 * @property {String} firstName
 * @property {String} lastName
 * @property {String} profession
 * @property {Number} [balance]
 * @property {String} [type]
 */

/**
 * @typedef ProfileCreationAttributes
 * @type {Object}
 * @property {Number} [id]
 * @property {String} firstName
 * @property {String} lastName
 * @property {String} profession
 * @property {Number} [balance]
 * @property {String} [type]
 */

/**
 * @callback GetContractorCallback
 * @returns {Promise<Array<import('./Contract').ContractInstance>>}
 */

/**
 * @callback GetClientCallback
 * @returns {Promise<Array<import('./Contract').ContractInstance>>}
 */

/**
 * @typedef ProfileLinks
 * @type {Object}
 * @property {GetContractorCallback} getContractorContracts
 * @property {GetClientCallback} getClientContracts
 */

/**
 * @typedef ProfileInstance
 * @type {import('sequelize').Model<ProfileAttributes, ProfileCreationAttributes> & ProfileAttributes & ProfileLinks}
 */

/**
 * @typedef ProfileModel
 * @type {import('sequelize').ModelCtor<ProfileInstance>}
 */

const getModelDefenition = require("./helper").getModelDefenition;

/**
 * @param {import('sequelize').Sequelize} sequelize - the sequelize instance
 * @returns {ProfileModel} - Profile model
 */
const defineProfile = (sequelize, options = { noIndexes: false }) => {
  const [modelName, modelAttributes, modelOptions] = getModelDefenition(
    sequelize,
    "Profile"
  );
  return sequelize.define(modelName, modelAttributes, {
    ...modelOptions,
    indexes: options.noIndexes ? [] : modelOptions.indexes,
  });
};
exports.define = defineProfile;

/**
 * @param {import('./index').AllModelsMap} models - all models
 */
exports.link = (models) => {
  const Profile = models.Profile;
  Profile.hasMany(models.Contract, {
    foreignKey: "ContractorId",
    as: "Contractor",
  });
  Profile.hasMany(models.Contract, { foreignKey: "ClientId", as: "Client" });
};
