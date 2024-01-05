const mongoose = require('mongoose')
const applicantSchema = new mongoose.Schema({
    fullname: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    cvPath: {
      type: String,
      required: true
    }
  });
  
  module.exports = mongoose.model('Applicant', applicantSchema);