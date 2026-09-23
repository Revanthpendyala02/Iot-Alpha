const express = require('express');
const connectDb = require('./config/db');
const dotenv = require("dotenv")
const app = express();
const dns = require("dns");
const authRoute = require('./routes/authRoutes');
const courseRoute = require('./routes/courseRoutes');

app.use(express.json())
dotenv.config()
dns.setServers(["1.1.1.1","8.8.8.8"])

app.use("/api/auth",authRoute)
app.use("/api/courses",courseRoute)

app.get("/Welcome", (req, res) => {
    res.send("Welcome to the server");
})


connectDb()


app.listen(3000, () => {
  console.log("listening to the PORT");
})