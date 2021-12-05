const internal = require("./jobs.internal.controller");

/**
 * @param {import('express').Request & {profile: import('../../../models/definers/Profile').ProfileInstance}} req
 * @param {import('express').Response} res
 */
const getUnpaidAndActiveJobs = async (req, res) => {
  const profile = req.profile;
  const { success, unpaidAndActiveJobs, errorMessage, status } =
    await internal.getUnpaidAndActiveJobs(profile);

  if (success) {
    res.json({ unpaidAndActiveJobs });
  }
  res.status(status || 400).end(errorMessage);
};
exports.getUnpaidAndActiveJobs = getUnpaidAndActiveJobs;

/**
 * @param {import('express').Request<{jobId: string}> & {profile: import('../../../models/definers/Profile').ProfileInstance}} req
 * @param {import('express').Response} res
 */
const payJob = async (req, res) => {
  const profile = req.profile;
  const jobId = req.params.jobId;
  const { success, errorMessage, status } = await internal.payJob(
    profile,
    jobId
  );

  if (success) {
    res.end();
  }
  res.status(status || 400).end(errorMessage);
};
exports.payJob = payJob;
