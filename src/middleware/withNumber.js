const { parseAndValidateNumber } = require("../utils/number.util");

/**
 * @param {"body" | "query" | "params"} from where to get the number to parse from
 * @param {string} key the key in the previously specified `from` object to use to get the number to parse and validate
 * @param {import('../utils/number.util').ParseAndValidateNumberOptions} options
 * @param {string} [outputKey] the key on the request object to put the parsed number on. defaults to key
 * @returns {import('express').RequestHandler}
 */
const withNumber = (from, key, options, outputKey) => (req, res, next) => {
  try {
    outputKey = outputKey || key;
    const numberStr = req[from][key];
    const number = parseAndValidateNumber(numberStr, options);
    req[outputKey] = number;
    next();
  } catch (err) {
    res.status(400).end(err.message);
  }
};

module.exports = withNumber;
