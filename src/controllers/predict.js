const fetch = require("node-fetch");
var FormData = require('form-data');
const fs = require('fs');

const predictAll = async (req, res) => {
  try {
    // console.log('body predict', req.body.image)
    const uploadedImage = fs.readFileSync('predict-uploads/' + req.body.image) 
    console.log('uploadedImage', uploadedImage)
    const formData = new FormData()
    formData.append("image", uploadedImage, {filename: req.body.image})
    fetch(process.env.FLASK_URL + '/predict-all', {
      method: 'POST',
      headers: {
        ...formData.getHeaders()
      },
      body: formData
    }).then(res => res.json()).then(json => {
      console.log(json)
      res.status(200).send(json)
    }).catch(err => {
      console.log(err)
    })
    console.log(req.body);
  } catch (error) {
    console.error(error);
  }
};

const predictModel = async (req, res) => {
  try {
    console.log(req.body);
  } catch (error) {
    console.error(error);
  }
};

module.exports = {
  predictAll,
  predictModel
};