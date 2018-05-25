const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fetcher', {useMongoClient: true});

const cannedDate = require('../data.json');

let repoSchema = mongoose.Schema({
  id: Number,
  name: String,
  ownerLogin: String,
  ownerUrl: String,
  description: String,
  createdAt: String
});

let Repo = mongoose.model('Repo', repoSchema);

let save = (dataArray, callback) => {
  // This function should save a repo or repos to
  // the MongoDB
  dataArray.forEach(function(entry, index) {
  	var data = { id: entry.id,
  		name: entry.name,
  		ownerLogin: entry.owner.login,
  		ownerUrl: entry.owner.url,
  		description: entry.description,
  		createdAt: entry.created_at
  	};
  	console.log(JSON.stringify('data going into Repo', data));
  	var repo = new Repo(data);
  	repo.save(callback);
  });
}

let cb = function(err, repo) {
	if(err) {
		console.log('err saving repo:', err);
		return;
	}
	console.log('repo saved successfully:', repo);
	return;
}

// let handleSaveError = function(err) {
// 	if (err) {
// 		console.log('got error saving to mongo');
// 	}
// }

//save(cannedDate, cb);
// save(cannedDate, cb);

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

// get(cbGet);

module.exports.save = save;
module.exports.get = get;