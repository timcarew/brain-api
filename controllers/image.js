const Clarifai = require("clarifai");
const clarifai = new Clarifai.App({
  apiKey: '85cbd57ca3e341b780db9fec44fea0cc'
});

const handleApiCall = (req, res) => {
  clarifai.models
    .predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
    .then(data => {
      res.json(data);
    })
    .catch(err => res.status(400).json('unable to work with api'));
}

const handleImagePut = (req, res, db) => {
  const { id } = req.body;
  db('users').where('id', '=', id)
    .increment('entries', 1)
    .returning('entries')
    .then(entries => {
      res.json(entries[0]);
    })
    .catch(err => res.status(400).json("unable to get entries"))
}

module.exports = {
  handleImagePut: handleImagePut,
  handleApiCall: handleApiCall
};