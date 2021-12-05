const { CLIENT } = require("../enums/ProfileTypes");
const withProfile = require("./withProfile");

/**
 * @param {"body" | "query" | "params" | "headers"} from where to get the client id from
 * @param {string} key the key in the previously specified `from` object to use to get the client id
 * @returns {import('express').RequestHandler}
 */
const withClient = (from, key) => withProfile(from, key, "client", CLIENT);

module.exports = withClient;
