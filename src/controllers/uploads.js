const fetch = require("node-fetch");
var FormData = require("form-data");
const fs = require("fs");
const Upload = require("../models/uploads");

const uploadImage = async (req, res) => {
  try {
    var doc = await Upload.create({
      image: req.body.image,
      user: req.user.userId,
      category: req.body.category,
    });
    console.log("doc", doc);
    const uploadedImage = fs.readFileSync("predict-uploads/" + req.body.image);
    const formData = new FormData();
    formData.append("image", uploadedImage, { filename: req.body.image });
    fetch(process.env.FLASK_URL + "/verify", {
      method: "POST",
      headers: {
        ...formData.getHeaders(),
      },
      body: formData,
    })
      .then((res) => res.json())
      .then(async (json) => {
        if (json.data.verifiedCategory === req.body.category) {
          await Upload.findByIdAndUpdate(doc._id, {
            isVerified: true,
          });
        }else{
          await Upload.findByIdAndUpdate(doc._id, {
            isVerified: false,
          });
        }
        res.status(200).send({status: "success", data: json, message: "Image uploaded successfully"});
      })
      .catch((err) => {
        console.log(err);
      });
    console.log(req.body);
  } catch (error) {
    console.error(error);
  }
};

const getUploads = async (req, res) => {
  try {
    const uploads = await Upload.find({ user: req.user.userId });
    res.status(200).send({ status: "success", data: uploads });
  } catch (error) {
    console.error(error);
  }
};

module.exports = {
  uploadImage,
  getUploads,
};
