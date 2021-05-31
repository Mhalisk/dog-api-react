import { capitalize, isValidResponse } from "./Utils";

test("capitalize the first letter of a string", () => {
  const string = "michael";
  expect(capitalize(string)).toEqual("Michael");
});

test("isValidResponse returns false for an invalid response", () => {
  const emptyResponse = {};
  expect(isValidResponse(emptyResponse)).toEqual(false);

  const responseWithBadStatusCode = {
    status: 404,
  };
  expect(isValidResponse(responseWithBadStatusCode)).toEqual(false);

  const responseWithBadStatus = {
    status: 200,
    data: {
      status: "unsuccessful",
    },
  };
  expect(isValidResponse(responseWithBadStatus)).toEqual(false);

  const responseWithEmptyData = {
    status: 200,
    data: {
      status: "success",
      message: {},
    },
  };
  expect(isValidResponse(responseWithEmptyData)).toEqual(false);
});
