const internal = require("./contract.internal.controller");

/**
 * @param {import('express').Request<{contractId: string}> & {profile: import('../../../models/definers/Profile').ProfileInstance}} req
 * @param {import('express').Response} res
 */
const getMyContract = async (req, res) => {
  const profile = req.profile;
  const contractId = req.params.contractId;
  const { success, contract, errorMessage, status } =
    await internal.getMyContract(profile, contractId);

  if (success) {
    res.json(contract);
  }
  res.status(status || 400).end(errorMessage);
};
exports.getMyContract = getMyContract;

/**
 * @param {import('express').Request & {profile: import('../../../models/definers/Profile').ProfileInstance}} req
 * @param {import('express').Response} res
 */
const getMyNonterminatedContracts = async (req, res) => {
  const profile = req.profile;
  const { success, nonterminatedContracts, errorMessage, status } =
    await internal.getMyNonterminatedContracts(profile);

  if (success) {
    res.json({ nonterminatedContracts });
  }
  res.status(status || 400).end(errorMessage);
};
exports.getMyNonterminatedContracts = getMyNonterminatedContracts;
