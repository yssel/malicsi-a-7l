"use strict"

const express = require('express');
const fileUpload = require('express-fileupload');
const app = express();
 /*
// default options 
app.use(fileUpload());*/
 
exports.imageUpload = (req, res) => {
  console.log("File Upload");
  console.log(req.body);
  console.log(req.files);
  

 // var upload = multer().single("1.png")
  /*upload(req, res, function (err) {
    if (err) {
      // An error occurred when uploading 
      return
    }
    res.status(200).send('File uploaded!');
 
    // Everything went fine 
  })*/
  /*let extension = "";
  if (!req.files)
    return res.status(400).send('No files were uploaded.');

  let img = req.files.file;
  console.log(img);
  if (img.mimetype == 'image/jpeg' || img.mimetype == 'image/jpg' )
    extension = ".jpg";
  if (img.mimetype == 'image/png')
    extension = ".png";

  img.mv(req.body.path + req.body.fileName + extension, (err) => {
    if (err)
      return res.status(500).send(err);
 
  });*/
    res.status(200).send('File uploaded!');
};
