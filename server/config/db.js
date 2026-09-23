const mongoose = require("mongoose")

async function connectDb() {
    await mongoose.connect(process.env.MONGO_URL)
    console.log("MongoDB connected succesfully...")

}
module.exports = connectDb