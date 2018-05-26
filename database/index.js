const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fetcher', {useMongoClient: true});

const cannedDate = require('../data.json');

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

	// TODO: don't really need 'callback' b.c creating on
	//       here for 'save'

  // check array: could be multiples
  //      for each do a 'get' w/ callback
  //				if callback OK do save

	var githubResultArray = usernameArray.forEach((user) => {

	});


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
}

let saveCallBack = function(err, repo) {
if(err) {
	console.log('err saving repo:', err);
	return;
}
console.log('repo saved successfully:', repo);
return;
}

let get = (callback) => {
	// query.find({ name: 'Los Pollos Hermanos' }).find(callback)
	// Repo.find().limit(25).sort({ age: -1 }).exec(callback).
	Repo.find({}, null, { limit: 25 }, function (err, docs) {
		if(err) {
			console.log('got error retrieving repos:', err);
			callback(err, null);
			return;
		}
		console.log('got repos');
		callback(null, docs)
	});
}

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