const Clarifai = require('clarifai');

//Use API Key here
const app = new Clarifai.App({
  apiKey: 'b211e10d1dcc4030bcc2748eb05e8efd'
  }
);

const handleApiCall = (req, res) => {
	app.models
	.predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
	.then(data => {
		res.json(data);
	})
	.catch(err => res.status(400).json('Unable to work with API'))
}


const handleImage = (req, res, db) => {
	const {id} = req.body;
	db('users').where('id', '=', id)
  	.increment('entries', 1)
  	.returning('entries')
  	.then(entries => {
  		res.json(entries[0]);
  	})
  	.catch(err => res.status(400).json('unable to get entry count'));
}

module.exports = {
	handleImage: handleImage,
	handleApiCall
}