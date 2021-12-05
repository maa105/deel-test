/** @type {ParseAndValidateNumberOptions} */
const defaultOptions = {
  required: true,
  errorMessages: {
    invalid: "Invalid number",
    required: "Missing required number field",
    min: "Number less than ${min}",
    max: "Number greater than ${max}",
  },
};

/**
 * @param {ParseAndValidateNumberOptions} options
 * @returns {ParseAndValidateNumberOptions}
 */
const getOptions = (options = {}) => ({
  ...defaultOptions,
  ...options,
  errorMessages: Object.assign(
    {},
    defaultOptions.errorMessages,
    options.errorMessages
  ),
});

/**
 * @typedef {object} ParseAndValidateNumberOptions_ErrorMessages
 * @property {string} [required] required if required option it true
 * @property {boolean} invalid
 * @property {number} [min] required id min option is specified
 * @property {number} [max] required id max option is specified
 */

/**
 * @typedef {object} ParseAndValidateNumberOptions
 * @property {ParseAndValidateNumberOptions_ErrorMessages} errorMessages
 * @property {number} [default]
 * @property {boolean} [required]
 * @property {number} [min]
 * @property {number} [max]
 * @property {boolean} [excludeMin]
 * @property {boolean} [excludeMax]
 */

/**
 * @param {string} numberStr the string representation of the number to parse
 * @param {ParseAndValidateNumberOptions} options
 * @returns {number}
 */
const parseAndValidateNumber = (numberStr, options) => {
  options = getOptions(options);

  if (!numberStr) {
    if (options.default != null) {
      return options.default;
    }
    if (options.required !== false) {
      throw new Error(options.errorMessages.required);
    }
    return;
  }
  const number = Number(numberStr);
  if (isNaN(number)) {
    throw new Error(options.errorMessages.invalid);
  }
  if (options.min != null) {
    if (
      number < options.min ||
      (options.excludeMin && number === options.min)
    ) {
      throw new Error(options.errorMessages.min.replace("${min}", options.min));
    }
  }
  if (options.max != null) {
    if (
      number > options.max ||
      (options.excludeMax && number === options.max)
    ) {
      throw new Error(options.errorMessages.max.replace("${min}", options.max));
    }
  }

  return number;
};

exports.parseAndValidateNumber = parseAndValidateNumber;
