const express = require("express");
const app = express();
const PORT = 8080;

app.use(express.static(__dirname + "/dist"));
// app.use(express.static(__dirname + "/src"));

app.listen(PORT, () =>
    console.log(`Server listening on port: http://localhost:${PORT}`)
);