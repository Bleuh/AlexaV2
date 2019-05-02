/* eslint-disable no-undef */
/* eslint-disable import/no-extraneous-dependencies */
const { assert, expect } = require('chai').use(require('chai-json'));
const test = require('firebase-functions-test')({
  projectId: 'alexav2-f8acf',
  databaseURL: 'https://alexav2-f8acf.firebaseio.com',
  storageBucket: 'alexav2-f8acf.appspot.com',
  cloudResourceLocation: 'us-central',
});

test.mockConfig({ api: { key: process.env.API_KEY } });

const { checkFields } = require('../lib/services/request.checker');

describe('checkFields', () => {
  it('return', () => {
    const {
      miss,
      extra,
      ok,
    } = checkFields(['responseId', 'queryResult', 'originalDetectIntentRequest', 'session'], ['queryResult', 'hackParam']);

    assert.isArray(miss);
    assert.isArray(extra);
    assert.isBoolean(ok);
    expect(ok).to.eql(false);

    expect(checkFields(['isOk'], ['isOk']).ok).to.eql(true);
    expect(checkFields(['isOk'], ['isOk', 'notOk']).ok).to.eql(false);
    expect(checkFields([], []).ok).to.eql(true);
  });
});

const {
  getFieldsError,
  getApiSuccessResponse,
  getApiErrorResponse,
} = require('../lib/services/server.response');

describe('getFieldsError', () => {
  it('format', () => {
    const json = getFieldsError('Hi', ['field1', 'field2'], ['field3']);
    assert.isObject(json);
    const jsonFormat = {
      message: 'Missing parameters',
      error: {
        miss: [
          'field1',
          'field2',
        ],
        extra: ['field3'],
      },
      fulfillmentText: 'Hi',
    };
    expect(json).to.eql(jsonFormat);
  });
});

describe('getApiSuccessResponse', () => {
  it('format', () => {
    const json = getApiSuccessResponse('Hi', 'IA message');
    assert.isObject(json);
    const jsonFormat = {
      message: 'Hi',
      error: null,
      fulfillmentText: 'IA message',
    };
    expect(json).to.eql(jsonFormat);
  });
});

describe('getApiErrorResponse', () => {
  it('format', () => {
    const json = getApiErrorResponse('A error', 'IA message');
    assert.isObject(json);
    const jsonFormat = {
      message: 'A error',
      error: 'IA message',
      fulfillmentText: 'IA message',
    };
    expect(json).to.eql(jsonFormat);
  });
});

const { dialogflowFirebaseFulfillment } = require('../lib/index');

describe('dialogflowFirebaseFulfillment', () => {
  it('wrong resquest', (done) => {
    const req = { body: { text: 'input' } };
    const res = {
      status(code) {
        assert.equal(code, 200);
        return this;
      },
      json(json) {
        assert.isObject(json);
        done();
      },
      setHeader() {}, // Needed for cors middleware
    };
    dialogflowFirebaseFulfillment(req, res);
  });
  it('good resquest', (done) => {
    const req = {
      body: {
        responseId: '',
        queryResult: '',
        originalDetectIntentRequest: '',
        session: '',
      },
    };
    const res = {
      status(code) {
        assert.equal(code, 200);
        return this;
      },
      json(json) {
        assert.isObject(json);
        done();
      },
      setHeader() {}, // Needed for cors middleware
    };
    dialogflowFirebaseFulfillment(req, res);
  });
});
