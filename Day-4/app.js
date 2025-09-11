// Internal module
// const http = require("http");

// External module
const express = require("express");

// Local module
// const requestHandler = require("./user");

const app = express();

app.use((req, res, next) => {
  console.log("first middleware", req.url, req.method);
  next();
});

app.use((req, res, next) => {
  console.log("second middleware", req.url, req.method);
  res.send("<p>Welcome to the world of backend</p>");
});

// const server = http.createServer(app);

const PORT = 3000;

// server.listen(PORT, () => {
//   console.log(`Server is running on address http://localhost:${PORT}`);
// });

app.listen(PORT, () => {
  console.log(`Server is running on address http://localhost:${PORT}`);
});
