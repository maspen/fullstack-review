const express = require('express');
let app = express();
const github = require('../helpers/github.js');
const mongoose = require('../database/index.js');

app.use(express.static(__dirname + '/../client/dist'));

app.post('/repos', function (req, res) {
  // This route should take the github username provided
  // and get the repo information from the github API, then
  // save the repo information in the database
  // getFromGithub

console.log('POST /repos req.data', req.data);

  console.log('/repos post username:', req.body);
  github.getReposByUsername(req.body, function(err, res){
  	if (err) {
  		console.log('error retrieving github data for ' + username);
  		res.write('error retrieving github data: ', error);
			res.status(500).send();
  		return;
  	}
  	console.log('got github repo data from github for ' + username);
  	mongoose.save(res.body, function(err) {
  		if (err) {
  			console.log('error saving repo for ' + username + ' :', err)
  			res.write('error: ', error);
				res.status(500).send();
  			return;
  		}
  		console.log('github repos saved for user ', username);
  		res.write('success');
			res.status(200).send();
  	})
  })
});

app.get('/repos', function (req, res) {
  // This route should send back the top 25 repos
  mongoose.get(function(err, docs) {
    if (err) {
      console.log('error retrieving github records from mongo:', err)
      res.write('error: ', error);
      res.status(500).send();
      return;
    }
    console.log('got github records from mongo');
    // console.log('docs:', JSON.stringify(docs));
    res.write(JSON.stringify(docs));
    res.status(200).send();
  });
});

let port = 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});

