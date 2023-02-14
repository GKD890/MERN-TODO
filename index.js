import express from "express";
// import * as bodyParer from "body-parser"
import mongoose from "mongoose";
// import {  test } from "./database/Task.js";
import dotenv from "dotenv";
import { router } from "./routes/routes.js";
import cors from "cors";

dotenv.config()
const defaultDB = "ExTodo";
const mongoUrl = process.env.DB_CONNECT_URL + defaultDB + process.env.DB_CONNECT_OPTION;
console.log(mongoUrl);
const PORT = process.env.PORT || 3000

const app = express();
app.use(express.urlencoded({extended: true}) );
app.use(cors());

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(mongoUrl);
    console.log(`MongoDB Connected: ${conn.connection.host} \n url:${mongoUrl}`);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
}

//Routes go here

app.get("/",(req,res) =>{
  res.send("homepage");
})

app.use('/api',router);

//Connect to the database before listening
connectDB().then(() => {
    app.listen(PORT, () => {
        console.log("Connected to DB");
    })
})

