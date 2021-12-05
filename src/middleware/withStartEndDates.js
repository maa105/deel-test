const { parseStartAndEndDates } = require("../utils/date.utils");

/**
 * @param {boolean} expandTime defaults to true
 * @returns {import('express').RequestHandler}
 */
const withStartAndEndDates =
  (expandTime = true) =>
  (req, res, next) => {
    try {
      const query = req.query;
      const [startDate, endDate] = parseStartAndEndDates(
        query.start,
        query.end,
        expandTime
      );
      req.startDate = startDate;
      req.endDate = endDate;
      next();
    } catch (err) {
      res.status(400).end(err.message);
    }
  };

module.exports = withStartAndEndDates;
