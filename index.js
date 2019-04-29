const express = require("express");
const { join } = require("path");

const app = express();

const filePath = join(__dirname, "dist", "Swiip.jpg");

app.use((req, res) => {
  res.sendFile(filePath);
});

module.exports = app;
