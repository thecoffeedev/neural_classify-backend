const monsoose = require('mongoose');
const Schema = monsoose.Schema;

const uploadSchema = new Schema({
  image: { type: String, required: true },
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  category: { type: String, required: true },
  isVerified: { type: Boolean, default: false },
  isDeleted: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const Upload = monsoose.model('Upload', uploadSchema);

module.exports = Upload;