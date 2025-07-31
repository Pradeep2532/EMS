const express = require('express');
require('dotenv').config();
require('./db.js'); 
const app = express();
const cors = require('cors')
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const path = require('path');

const corsOptions = {
  origin: 'http://localhost:5173', // Allow your frontend origin
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE", // Allow these methods
  credentials: true,
  optionsSuccessStatus: 204 // For legacy browser support
};
app.use(cors(corsOptions))
const PORT = process.env.PORT || 5000;

const employeRouter = require("./routers/employeeRouter")
app.use("/employee", employeRouter);

// Serve frontend build
app.use(express.static(path.join(__dirname, "../frontend/dist")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/dist/index.html"));
});

app.listen(PORT, () => {
  console.log(`App is running on port ${PORT}`);
});