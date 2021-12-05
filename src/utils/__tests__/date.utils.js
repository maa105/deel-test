const { parseStartAndEndDates } = require("../date.utils");
describe("parseStartAndEndDates", () => {
  it("should expand time by properly", () => {
    const [start, end] = parseStartAndEndDates(
      "2020-01-01",
      "2021-01,01",
      true
    );
    expect(start.getTime()).toEqual(1577836800000);
    expect(end.getTime()).toEqual(1609459199999);
  });

  it("should not expand time when not requested", () => {
    const [start, end] = parseStartAndEndDates(
      "2020-01-01",
      "2021-01,01",
      false
    );
    expect(start.getTime()).toEqual(1577836800000);
    expect(end.getTime()).toEqual(1609455600000);
  });

  it("should expand time by default", () => {
    const [start, end] = parseStartAndEndDates("2020-01-01", "2021-01,01");
    expect(start.getTime()).toEqual(1577836800000);
    expect(end.getTime()).toEqual(1609459199999);
  });

  it("should throw if start date is invalid", () => {
    let error;
    try {
      parseStartAndEndDates("xxxx", "2021-01,01");
    } catch (err) {
      error = err;
    }
    expect(error.message).toEqual("Invalid start date");
  });

  it("should throw if end date is invalid", () => {
    let error;
    try {
      parseStartAndEndDates("2020-01,01", "xxxx");
    } catch (err) {
      error = err;
    }
    expect(error.message).toEqual("Invalid end date");
  });
});
