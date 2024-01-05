const cloudinary = require('cloudinary').v2;
const Applicant = require('../models/applicants')
const fs = require("fs");
          

const createApplicant = async (req, res) => {
    const { fullname, email } = req.body;

  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send('No files were uploaded.');
  }

  const cvFile = req.files.cv;

  try {
    // Specify a path where you want to temporarily store the file on your server
    const tempFilePath = `./uploads/${cvFile.name}`;

    // Move the file to the specified path
    cvFile.mv(tempFilePath, async (mvErr) => {
      if (mvErr) {
        console.error('Error moving file:', mvErr);
        return res.status(500).send('Error moving file.');
      }

      try {
        // Upload the file to Cloudinary
        const result = await cloudinary.uploader.upload(tempFilePath,{ resource_type: 'raw' });

        // Access the Cloudinary URL for the uploaded file
        const cvUrl = result.secure_url;

        // Save other applicant data, including cvUrl, to your database as needed
        const newApplicant = new Applicant({
          fullname,
          email,
          cvPath: cvUrl, // Save the Cloudinary URL in the model
        });

        await newApplicant.save();

        // Remove the temporarily stored file
        fs.unlinkSync(tempFilePath);

        res.send('File uploaded and data saved!');
      } catch (cloudinaryErr) {
        console.error('Error uploading file to Cloudinary:', cloudinaryErr);
        res.status(500).send('Error uploading file to Cloudinary.');
      }
    });
  } catch (error) {
    console.error('Error handling file upload:', error);
    res.status(500).send('Error handling file upload.');
  }
  };

  const getApplicant = async (req,res)=>{
    try {
        const applicant = await Applicant.find({})
        res.status(200).json({applicant})
       } catch (error) {
        res.status(401).json({error})
       }
  }
  const deleteApplicant = async(req,res)=>{
    const {id:taskID} = req.params;
    const applicant = await Applicant.findOneAndDelete({_id:taskID})
    if(!applicant){
        res.status(404).json({msg:"no user with id"})
       }
       res.status(200).json({applicant})
  }

  module.exports = {createApplicant,getApplicant,deleteApplicant}