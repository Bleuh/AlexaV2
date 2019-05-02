// @flow

/*
Service definition
*/
const getFieldsError = (
  errorMessage: string,
  miss: Array<string>,
  extra: Array<string>,
): Object => ({
  message: 'Missing parameters',
  error: {
    miss,
    extra,
  },
  fulfillmentText: errorMessage,
});

const getApiSuccessResponse = (successMessage: string, data: string): Object => ({
  message: successMessage,
  error: null,
  fulfillmentText: data,
});

const getApiErrorResponse = (errorMessage: string, error :string): Object => ({
  message: errorMessage,
  error,
  fulfillmentText: error,
});
//


/*
Export service functions
*/
module.exports = {
  getFieldsError,
  getApiSuccessResponse,
  getApiErrorResponse,
};
//
