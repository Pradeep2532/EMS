const express = require('express');
require('dotenv').config();
require('./db.js'); 
const app = express();
const cors = require('cors')
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const corsOptions = {
  origin: 'http://localhost:5173', // Allow your frontend origin
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE", // Allow these methods
  credentials: true,
  optionsSuccessStatus: 204 // For legacy browser support
};

const employeRouter = require("./routers/employeeRouter")
const PORT = process.env.PORT || 5000;
app.use(cors(corsOptions))


app.use("/employee", employeRouter);

app.listen(PORT, () => {
  console.log(`App is running on port ${PORT}`);
});