const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fetcher', {useMongoClient: true});

const cannedDate = require('../data.json');

const githubGetForUser = require('../helpers/github.js');

mongoose.Promise = Promise;

let repoSchema = new mongoose.Schema({
  id: Number,
  name: String,
  ownerLogin: String,
  ownerUrl: String,
  description: String,
  createdAt: String
});
let Repo = mongoose.model('Repo', repoSchema);

let save = (usernameArray, callback) => {
	// This function should save a repo or repos to
  // the MongoDB
console.log('github save got usernameArray:', JSON.stringify(usernameArray));
	// TODO: don't really need 'callback' b.c creating on
	//       here for 'save'

  // check array: could be multiples
  //      for each do a 'get' w/ callback
  //				if callback OK do save

  // its an http request
  let getFromGithubCallback = (err, res) => {
	  if (err) {
	    console.log('error from githube ', err);
	    return err;
	  }
  	console.log('res to be saved to db', res.body);
  	return;
	};

	// mongo uses callbacks (Promises)
	let saveCallBack = function(err, repo) {
		if(err) {
			console.log('err saving repo:', err);
			return;
		}
		console.log('repo saved successfully: id : ownerLogin', repo.id, repo.ownerLogin);
		/*
	{ __v: 0,
  id: 20243956,
  name: 'jsconf2014',
  ownerLogin: 'hackreactor',
  ownerUrl: 'https://api.github.com/users/hackreactor',
  description: 'Curriculum for the 2014 JSConf training track',
  createdAt: '2014-05-28T03:28:58Z',
  _id: 5b09ee6aabd73c84c459c5ab }
		*/
		return;
	}

	usernameArray.forEach((userName) => {
// console.log('getting github repose for', userName);
		githubGetForUser.getReposByUsername(userName, (err, res) => {
		  if (err) {
		    console.log('error from github', err);
		    return err;
		  }
// console.log('-------------------------------------------------')		  
// 		  console.log('res to be saved to db', JSON.parse(res.body));
// console.log('-------------------------------------------------')		  
		  // save the github data for this user
		  saveToMongo(JSON.parse(res.body), saveCallBack);
		});
	});

/*
  Array.prototype.forEach.call(usernameArray, user => {
	console.log('ENTRY:', entry);
  	var saveData = { 
  		id: entry.id,
  		name: entry.name,
  		ownerLogin: entry.owner.login,
  		ownerUrl: entry.owner.url,
  		description: entry.description,
  		createdAt: entry.created_at
  	};
  	console.log(JSON.stringify('data going into Repo', saveData));
  	var repo = new Repo(saveData);
  	repo.save(callback);
  });
*/  
}

let saveToMongo = (githubDataArray, callback) => {
	// Array.prototype.forEach.call(githubDataArray, repo => {
	githubDataArray.forEach( repo => {
// console.log('-------------------------------------------------');
// console.log('repo', repo);
// console.log('-------------------------------------------------');
		var saveData = {
			id: repo.id,
			name: repo.name,
			ownerLogin: repo.owner.login,
			ownerUrl: repo.owner.url,
			description: repo.description,
			createdAt: repo.created_at
		};
		//console.log(JSON.stringify('data going into Repo', saveData));
		var repo = new Repo(saveData);
	  repo.save(callback)
	  .then(err => {
	  	callback(null, err);
	  })
	  .then(product => {
	  	callback(product, null);
	  });
	});
	// create the data
	// var saveData = { 
	// 	id: githubData.id,
	// 	name: githubData.name,
	// 	ownerLogin: githubData.owner.login,
	// 	ownerUrl: githubData.owner.url,
	// 	description: githubData.description,
	// 	createdAt: githubData.created_at
	// };
	// console.log(JSON.stringify('data going into Repo', saveData));
	// var repo = new Repo(saveData);
 //  repo.save(callback);
}

let get = (callback) => {
	//** when page loads '{}' is sent
	// query.find({ name: 'Los Pollos Hermanos' }).find(callback)
	// Repo.find().limit(25).sort({ age: -1 }).exec(callback).
	// '{}' means all
	// test
	// var testCallback = (err, docs) => {
	// 	if (err) {
	// 		console.log('mongo save error', err);
	// 	}
	// 	console.log('mongo docs', docs)
	// }

//	Repo.find({}, null, { limit: 25 }, callback);

	Repo.find({}, null, { limit: 25 })
	// .exec(callback);
	.catch(err => {
console.log('mongo find got err', err);		
		callback(err, null);
	})
	.then(docs => {
// console.log('mongo find got docs', docs);		
		callback(null, docs);
	});
};

// 	Repo.find({}, null, { limit: 25 }, function (err, docs) {
// 		if(err) {
// 			console.log('got error retrieving repos:', err);
// 			callback(err, null);
// 			return;
// 		}
// 		console.log('got repos');
// 		callback(null, docs)
// 	});
// };
// let get = (callback) => {
// 	//** when page loads '{}' is sent
// 	// query.find({ name: 'Los Pollos Hermanos' }).find(callback)
// 	// Repo.find().limit(25).sort({ age: -1 }).exec(callback).
// 	// '{}' means all
// 	Repo.find({}, null, { limit: 25 }, callback);
// };

let cbGet = function(err, repo) {
	if(err) {
		console.log('err getting repos:', err);
		return;
	}
	console.log('repo retrieved:', repo);
	return;
}

// test retrieve docs rom the mongo db
//get(cbGet);

/** KEEP
mongo shell:
> mongo --shell

> show dbs
> admin     0.000GB
checkout  0.000GB
fetcher   0.000GB //
local     0.000GB

switch dbs
> use fetcher

// Find All Documents in a Collection
> db.fetcher.find()

// count collection
> db.repos.count()
> 98

db.fetcher.find(<query>).count()
*/

// let cb = function(err, repo) {
// 	if(err) {
// 		console.log('err saving repo:', err);
// 		return;
// 	}
// 	console.log('repo saved successfully:', repo);
// 	return;
// }

// test to populate the mongo db w/ called data
// save(cannedDate, cb);

module.exports.save = save;
module.exports.get = get;