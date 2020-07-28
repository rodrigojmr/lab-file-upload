// models/User.model.js
const mongoose = require('mongoose');

const { Schema, model } = require('mongoose');

const postSchema = new Schema(
  {
    content: {
      type: String
    },
    creatorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    picPath: {
      type: String
    },
    picName: {
      type: String
    }
  },
  {
    timestamps: true
  }
);

module.exports = model('Post', postSchema);
