const request = require('request');
const config = require('../config.js');

const cannedDate = require('../data.json');

/*
  github:
  default url: https://api.github.com
  header: Accept: application/vnd.github.v3+json
  imestamps in format: YYYY-MM-DDTHH:MM:SSZ

  get: summary representatiob: GET /orgs/octokit/repos
       detailed representation: GET /repos/octokit/octokit.rb

  curl -i https://api.github.com/users/octocat/orgs

  postman:
  GET https://api.github.com/users/maspen
  User-Agent | request
  Authorization | token 94f67ad0e00265008f3d51e6df4d4496b042dd64

  GET https://api.github.com/users/maspen/repos
  sort | updated
  direction | desc

*/


let getReposByUsername = (username, callback) => {
  // TODO - Use the request module to request repos for a specific
  // user from the github API

  // The options object has been provided to help you out, 
  // but you'll have to fill in the URL
  let options = {
    url: `https://api.github.com/users/${username}/repos`,
    method: 'GET',
    headers: {
      'User-Agent': 'request',
      'Authorization': `token ${config.TOKEN}`,
      'Content-Type': 'application/json',
      'sort': 'updated',
      'direction': 'desc'
    }
  };

  request(options, function(err, res) {
    if (err) {
      callback(err, null);
      return;
    }
    callback(null, res);
  });
}

let cb = (err, res) => {
  if (err) {
    console.log('error from githube ', err);
    return err;
  }
  // res
  console.log('res to be saved to db', res.body);
}

//getReposByUsername('maspen', cb);

module.exports.getReposByUsername = getReposByUsername;