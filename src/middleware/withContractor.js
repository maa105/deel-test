const { CONTRACTOR } = require("../enums/ProfileTypes");
const withProfile = require("./withProfile");

/**
 * @param {"body" | "query" | "params" | "headers"} from where to get the contractor id from
 * @param {string} key the key in the previously specified `from` object to use to get the contractor id
 * @returns {import('express').RequestHandler}
 */
const withContractor = (from, key) =>
  withProfile(from, key, "contractor", CONTRACTOR);

module.exports = withContractor;
