// @flow

/*
Create a function to check the data of a query
*/
const checkFields = (required: Array<string>, reqBody: Array<string>): Object => {
  // Creating a table for missing or too many fields
  const miss = [];
  const extra = [];

  // Check that there are no fields missing
  required.forEach((prop) => {
    if (reqBody.indexOf(prop) === -1) {
      miss.push(prop);
    }
  });

  // Check if to many field
  reqBody.forEach((prop) => {
    if (required.indexOf(prop) === -1) {
      extra.push(prop);
    }
  });

  // Check field
  const ok = (extra.length === 0 && miss.length === 0);

  return {
    ok,
    extra,
    miss,
  };
};

module.exports = {
  checkFields,
};
