// @flow

/*
Appel de l'api Twitch
*/
const https = require('https');
const functions = require('firebase-functions');

const apiKey = process.env.API_KEY;
const host = 'api.twitch.tv';

const apiCall = (): Promise<string> => new Promise((resolve, reject): void => {
  const path = '/kraken/games/top?limit=3';
  const options = {
    host,
    path,
    headers: {
      'Client-ID': apiKey || functions.config().api.key,
    },
  };
  https.get(options, (resp): void => {
    let data = '';

    // A chunk of data has been recieved.
    resp.on('data', (chunk): void => {
      data += chunk;
    });

    // The whole response has been received.
    resp.on('end', (): void => {
      const response = JSON.parse(data);
      const games = response.top;
      const output = `Les 3 jeux les plus regarder sont ${games[0].game.name}, ${games[1].game.name} et ${games[2].game.name}`;
      resolve(output);
    });
  }).on('error', (err): void => {
    reject(err.message);
  });
});

module.exports = {
  apiCall,
};
