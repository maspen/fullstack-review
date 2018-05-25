const express = require('express');
let app = express();
const github = require('../helpers/github.js');

app.use(express.static(__dirname + '/../client/dist'));

app.post('/repos', function (req, res) {
  // This route should take the github username provided
  // and get the repo information from the github API, then
  // save the repo information in the database
  // getFromGithub
  github.getReposByUsername(username, function(err, res){
  	if (err) {
  		console.log('got error retrieving github data for ' + username);
  		// TODO: send res w/ error code
  		return;
  	}
  	console.log('got github repo data from github for ' + username);
  	// TODO: send res / success
  	// TODO: save to db
  })
});

app.get('/repos', function (req, res) {
  // TODO - your code here!
  // This route should send back the top 25 repos
});

let port = 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});

