import mongoose from "mongoose";
import dotenv from 'dotenv'
dotenv.config()
var uri = `${process.env.MONGO_URL}/${process.env.MONGO_DB_NAME}`;
console.log(uri)
mongoose.connect(uri, { useUnifiedTopology: true, useNewUrlParser: true });

const connection = mongoose.connection;

connection.once("open", function () {
    console.log("MongoDB database connection established successfully");
});
console.log('done')

export default connection;