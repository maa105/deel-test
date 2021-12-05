const parseStartDate = (startStr, expandTime) => {
  if (!startStr) {
    startStr = new Date();
    startStr.setUTCFullYear(1, 0, 1);
  } else {
    startStr = new Date(startStr);
    if (isNaN(startStr.getDate())) {
      throw new Error("Invalid start date");
    }
  }
  if (expandTime) {
    startStr.setUTCHours(0, 0, 0, 0);
  }
  return startStr;
};
const parseEndDate = (endStr, expandTime) => {
  if (!endStr) {
    endStr = new Date();
    endStr.setUTCFullYear(endStr.getFullYear() + 10, 0, 1);
  } else {
    endStr = new Date(endStr);
    if (isNaN(endStr.getDate())) {
      throw new Error("Invalid end date");
    }
  }
  if (expandTime) {
    endStr.setUTCHours(23, 59, 59, 999);
  }
  return endStr;
};

/**
 * @param {string} startStr start date as string
 * @param {strind} endStr end date as string
 * @param {boolean} [expandTime] if true will set start date's time to 00:00:00 and end date's time to 23:59:59
 * @returns {Date[] & { 0: Date, 1: Date, length: 2 }}
 */
const parseStartAndEndDates = (startStr, endStr, expandTime = true) => {
  return [
    parseStartDate(startStr, expandTime),
    parseEndDate(endStr, expandTime),
  ];
};

exports.parseStartAndEndDates = parseStartAndEndDates;
