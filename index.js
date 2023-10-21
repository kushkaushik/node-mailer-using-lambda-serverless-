const serverless = require("serverless-http");
const express = require("express");

const cors = require('cors')

const {generateHTML,manipulateData,sendMail} = require('./services/node.service')

const app = express();


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors())





app.post("/send-email", async(req, res) => {
  try {
    const result = await manipulateData(req.body);
    res.status(200).json((result));
  } catch (error) {
    res.status(500).json({ message: 'Error sending email', error: error.message });
  }
});



app.use((req, res , next) => {
  return res.status(404).json({
    error: "Not Found",
  });
});



module.exports.handler = serverless(app);
