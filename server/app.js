const express = require('express');
const app = express();
app.get("/Welcome", (req, res) => {
    res.send("Welcome to the server");
})


app.listen(3000, () => {
  console.log("listening to the PORT");
})