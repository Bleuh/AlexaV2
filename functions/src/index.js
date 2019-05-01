// @flow

require('dotenv').config();

const functions = require('firebase-functions');

const { checkFields } = require('./services/request.checker');
const {
  getFieldsError,
  getApiSuccessResponse,
  getApiErrorResponse,
} = require('./services/server.response');

const { apiCall } = require('./services/call.api');

exports.dialogflowFirebaseFulfillment = functions.https.onRequest((request, response) => {
  const {
    miss,
    extra,
    ok,
  } = checkFields(['responseId', 'queryResult', 'originalDetectIntentRequest', 'session'], Object.entries(request.body).length !== 0 ? request.body.queryResult.parameters : []);

  if (!ok) {
    response.json(getFieldsError('Il semblerait que la requête envoyée soit erronée.', miss, extra));
  } else {
    apiCall()
      .then(output => response.json(getApiSuccessResponse('Data has been received successfully', output)))
      .catch(() => response.json(getApiErrorResponse('An error has been rise', 'Je suis désolé, je n\'arrive pas à contacter Twitch.')));
  }
});
