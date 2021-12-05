const {
  Op: { or: sequelizeOrOperator, between: sequelizeBetweenOperator },
  literal: sequelizeLiteral,
} = require("sequelize");
const { models, sequelize } = require("../../../models");
const { Profile, Contract, Job } = models;

/**
 * @typedef {object} BaseInternalResult
 * @property {boolean} success
 * @property {string} [errorMessage]
 * @property {number} [status]
 */

/**
 * @param {import('../../../models/definers/Profile').ProfileInstance} client
 * @param {number} amount
 * @returns {Promise<BaseInternalResult>}
 */
const depositMoneyToClientBalance = async (client, amount) => {
  const [result] = await models.Job.findAll({
    attributes: [[sequelize.fn("sum", sequelize.col("Job.price")), "total"]],
    raw: true,
    where: {
      paid: { [sequelizeOrOperator]: [false, null] },
    },
    include: {
      model: Contract,
      attributes: [],
      required: true,
      where: {
        ClientId: client.id,
      },
    },
  });
  const totalToPay = (result && result.total) || 0;
  if (amount > totalToPay * 0.25) {
    return {
      success: false,
      errorMessage: `Exceeded max deposit. Which is 25% of remaining total to pay (i.e: ${
        totalToPay * 0.25
      })`,
    };
  }

  const [affected] = await Profile.update(
    {
      balance: sequelizeLiteral(`balance + ${amount}`),
    },
    {
      where: {
        id: client.id,
      },
    }
  );

  if (affected === 0) {
    return {
      success: false,
      errorMessage: "Could not find client",
      status: 404,
    };
  }
  return { success: true };
};
exports.depositMoneyToClientBalance = depositMoneyToClientBalance;

/**
 * @param {Date} startDate
 * @param {Date} endDate
 * @returns {Promise<BaseInternalResult & {bestProfession: {name: string, totalPaid: number}}>}
 */
const getBestProfession = async (startDate, endDate) => {
  const result = await Job.findAll({
    attributes: [
      [sequelize.fn("sum", sequelize.col("Job.price")), "totalPaid"],
    ],
    raw: true,
    where: {
      paid: true,
      paymentDate: { [sequelizeBetweenOperator]: [startDate, endDate] },
    },
    include: {
      model: Contract,
      attributes: [],
      required: true,
      include: {
        model: Profile,
        as: "Contractor",
        attributes: ["profession"],
        required: true,
      },
    },
    group: sequelize.literal("`Contract->Contractor`.`profession`"),
    order: sequelize.literal("totalPaid DESC"),
    limit: 1,
  });

  const totalPaid = result[0] ? result[0].totalPaid : null;
  const bestProfession = result[0]
    ? result[0]["Contract.Contractor.profession"]
    : null;

  return {
    success: true,
    bestProfession: {
      name: bestProfession,
      totalPaid,
    },
  };
};
exports.getBestProfession = getBestProfession;

/**
 * @typedef {object} BestClient
 * @property {import('../../../models/definers/Profile').ProfileInstance} client
 * @property {number} totalPaid
 */

/**
 * @param {Date} startDate
 * @param {Date} endDate
 * @param {number} limit
 * @returns {Promise<BaseInternalResult & {bestClients: BestClient[]}>}
 */
const getBestClients = async (startDate, endDate, limit) => {
  const result = await Job.findAll({
    attributes: [
      [sequelize.fn("sum", sequelize.col("Job.price")), "totalPaid"],
    ],
    raw: true,
    where: {
      paid: true,
      paymentDate: { [sequelizeBetweenOperator]: [startDate, endDate] },
    },
    include: {
      model: Contract,
      attributes: [],
      required: true,
      include: {
        model: Profile,
        as: "Client",
        required: true,
      },
    },
    group: sequelize.literal("`Contract->Client`.`id`"),
    order: sequelize.literal("totalPaid DESC"),
    limit,
  });

  const bestClients = result.map((item) => {
    const newItem = {};
    const client = {};
    for (let key in item) {
      if (item.hasOwnProperty(key)) {
        if (key.startsWith("Contract.Client.")) {
          client[key.substr(16)] = item[key];
        } else {
          newItem[key] = item[key];
        }
      }
    }
    newItem.client = client;
    return newItem;
  });

  return {
    success: true,
    bestClients,
  };
};
exports.getBestClients = getBestClients;
