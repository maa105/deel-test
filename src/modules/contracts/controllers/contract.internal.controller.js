const {
  Op: { ne: sequelizeNotEqualOperator },
} = require("sequelize");

const { models } = require("../../../models");
const { CONTRACTOR } = require("../../../enums/ProfileTypes");
const ContractStatuses = require("../../../enums/ContractStatuses");

const { Contract } = models;

/**
 * @typedef {object} BaseInternalResult
 * @property {boolean} success
 * @property {string} [errorMessage]
 * @property {number} [status]
 */

/**
 * @param {import('../../../models/definers/Profile').ProfileInstance} profile
 * @param {number} contractId
 * @returns {Promise<BaseInternalResult & { contract: import('../../../models/definers/Contract').ContractInstance }>}
 */
const getMyContract = async (profile, contractId) => {
  const contract = await Contract.findOne({ where: { id: contractId } });

  if (!contract) {
    return {
      success: false,
      status: 404,
      errorMessage: "Contract not found",
    };
  }

  if (
    profile.id === contract.ClientId ||
    profile.id === contract.ContractorId
  ) {
    return {
      success: true,
      contract,
    };
  }
  return { success: false, status: 403, errorMessage: "Not authorized" };
};
exports.getMyContract = getMyContract;

/**
 * @param {import('../../../models/definers/Profile').ProfileInstance} profile
 * @returns {Promise<BaseInternalResult & { nonterminatedContracts: import('../../../models/definers/Contract').ContractInstance[] }>}
 */
const getMyNonterminatedContracts = async (profile) => {
  const notTerminated = {
    [sequelizeNotEqualOperator]: ContractStatuses.TERMINATED,
  };

  const nonterminatedContracts = await Contract.findAll({
    where:
      profile.type === CONTRACTOR
        ? {
            ContractorId: profile.id,
            status: notTerminated,
          }
        : {
            ClientId: profile.id,
            status: notTerminated,
          },
  });

  return {
    success: true,
    nonterminatedContracts,
  };
};
exports.getMyNonterminatedContracts = getMyNonterminatedContracts;
