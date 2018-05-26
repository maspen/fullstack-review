const express = require('express');
let app = express();
const github = require('../helpers/github.js');
const mongoose = require('../database/index.js');
const bodyParser = require('body-parser');

app.use(express.static(__dirname + '/../client/dist'));

app.use(bodyParser.json());
// body-parser: req.body

app.post('/repos', function (req, res) {
  console.log('/repos post username:', req.body);
  github.getReposByUsername(req.body, function(err, res){
  	if (err) {
  		console.log('error retrieving github data for ' + username);
  		res.write('error retrieving github data: ', error);
			res.status(500).send();
  		return;
  	}
    // req.body:
    // 1 { githubuser: 'matt' }
    // 3 { githubuser: 'joe bill mark' }
    // need to create of user/s from the response
    var usersString = req.body.githubuser;
    // could be 1 or many
    // string.split(' ') to create array
    // 1 ["matt"]
    // 3 ["joe", "bill", "mark"]
    var userArray = usersString.split(' ');
  	console.log('getting github repo/s from github for ', JSON.stringify(userArray));
  	mongoose.save(userArray, function(err) {
  		if (err) {
  			console.log('error saving repo for ' + JSON.string(userArray) + ' :', err)
  			res.write('error: ', error);
				res.status(500).send();
  			return;
  		}
  		console.log('github repos saved for user/s ', JSON.string(userArray));
  		res.write('success');
			res.status(200).send();
  	})
  })
});

app.get('/repos', function (req, res) {
  // This route should send back the top 25 repos
console.log('app got POST for get ... ');  
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

