const internal = require("./admin.internal.controller");

/**
 * @param {import('express').Request & {amount: number} & {client: import('../../../models/definers/Profile').ProfileInstance}} req
 * @param {import('express').Response} res
 */
const depositMoneyToClientBalance = async (req, res) => {
  const client = req.client;
  const amount = req.amount;
  const { success, errorMessage, status } =
    await internal.depositMoneyToClientBalance(client, amount);

  if (success) {
    res.end();
  }
  res.status(status || 400).end(errorMessage);
};
exports.depositMoneyToClientBalance = depositMoneyToClientBalance;

/**
 * @param {import('express').Request & {startDate: Date, endDate: Date}} req
 * @param {import('express').Response} res
 */
const getBestProfession = async (req, res) => {
  const startDate = req.startDate;
  const endDate = req.endDate;
  const { success, bestProfession, errorMessage, status } =
    await internal.getBestProfession(startDate, endDate);

  if (success) {
    res.json(bestProfession);
  }
  res.status(status || 400).end(errorMessage);
};
exports.getBestProfession = getBestProfession;

/**
 * @param {import('express').Request & {startDate: Date, endDate: Date, limit: number}} req
 * @param {import('express').Response} res
 */
const getBestClients = async (req, res) => {
  const startDate = req.startDate;
  const endDate = req.endDate;
  const limit = req.limit;
  const { success, bestClients, errorMessage, status } =
    await internal.getBestClients(startDate, endDate, limit);

  if (success) {
    res.json({ bestClients });
  }
  res.status(status || 400).end(errorMessage);
};
exports.getBestClients = getBestClients;
