const {
  Op: { or: sequelizeOrOperator, gte: sequelizeGreaterOrEqualOperator },
  literal: sequelizeLiteral,
} = require("sequelize");
const { models, sequelize } = require("../../../models");
const { CLIENT } = require("../../../enums/ProfileTypes");
const ContractStatuses = require("../../../enums/ContractStatuses");
const { Job, Contract, Profile } = models;

/**
 * @typedef {object} BaseInternalResult
 * @property {boolean} success
 * @property {string} [errorMessage]
 * @property {number} [status]
 */

/**
 * @param {import('../../../models/definers/Profile').ProfileInstance} profile
 * @returns {Promise<BaseInternalResult & { unpaidAndActiveJobs: import('../../../models/definers/Job').JobInstance[] }>}
 */
const getUnpaidAndActiveJobs = async (profile) => {
  const unpaidAndActiveJobs = await Job.findAll({
    where: {
      paid: {
        [sequelizeOrOperator]: [false, null],
      },
    },
    include: {
      model: Contract,
      attributes: [],
      required: true,
      where:
        profile.type === CLIENT
          ? {
              ClientId: profile.id,
              status: ContractStatuses.INPROGRESS,
            }
          : {
              ContractorId: profile.id,
              status: ContractStatuses.INPROGRESS,
            },
    },
  });

  return { success: true, unpaidAndActiveJobs };
};
exports.getUnpaidAndActiveJobs = getUnpaidAndActiveJobs;

/**
 * @param {import('../../../models/definers/Profile').ProfileInstance} profile
 * @param {number} jobId
 * @returns {Promise<BaseInternalResult>}
 */
const payJob = async (profile, jobId) => {
  const job = await Job.findByPk(jobId, {
    include: {
      model: Contract,
      attributes: ["status"],
      required: false,
      where: {
        ClientId: profile.id,
      },
    },
  });

  if (!job) {
    return { success: false, status: 404, errorMessage: "Job not found" };
  }
  if (!job.Contract) {
    return { success: false, status: 403, errorMessage: "Not your job" };
  }

  if (job.paid) {
    return { success: false, status: 409, errorMessage: "Already paid" };
  }

  const transaction = await sequelize.transaction();

  try {
    const [clientsAffected] = await Profile.update(
      {
        balance: sequelizeLiteral(`balance - ${job.price}`),
      },
      {
        where: {
          id: profile.id,
          balance: { [sequelizeGreaterOrEqualOperator]: job.price },
        },
        transaction,
      }
    );
    if (clientsAffected === 0) {
      await transaction.rollback();
      return {
        success: false,
        status: 400,
        errorMessage: "Not enough money in balance",
      };
    }

    const [jobsAffected] = await Job.update(
      {
        paid: true,
        paymentDate: new Date(),
      },
      {
        transaction,
        where: {
          id: job.id,
          paid: { [sequelizeOrOperator]: [false, null] },
        },
      }
    );
    if (jobsAffected === 0) {
      return { success: false, status: 409, errorMessage: "Already paid" };
    }

    await transaction.commit();
    return { success: true };
  } catch (err) {
    await transaction.rollback().catch(() => {});
    throw err;
  }
};
exports.payJob = payJob;
