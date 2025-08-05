const express = require('express');
require('dotenv').config();
require('./db.js'); 
const app = express();
const cors = require('cors')
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const path = require('path');

const corsOptions = {
  origin: 'https://neon-kheer-16199f.netlify.app/', // Allow your frontend origin
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE", // Allow these methods
  credentials: true,
  optionsSuccessStatus: 204 // For legacy browser support
};
app.use(cors(corsOptions))
const PORT = process.env.PORT || 5000;

const employeRouter = require("./routers/employeeRouter")
app.use("/employee", employeRouter);


app.listen(PORT, () => {
  console.log(`App is running on port ${PORT}`);
});