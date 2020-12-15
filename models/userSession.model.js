const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema;

const UserSessionSchema = new Schema(
  {
    userid: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true
  }
);

const UserSession = mongoose.model('UserSession', UserSessionSchema);

module.exports = UserSession;
