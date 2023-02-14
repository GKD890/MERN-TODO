import express from "express";
// import { urlencoded } from "body-parser";
import mongoose from "mongoose";
import {  test } from "./database/Task.js";
import dotenv from "dotenv";

const defaultDB = "ExTodo";
const PORT = process.env.PORT || 3000
dotenv.config()

const app = express()
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.DB_CONNECT_URL+defaultDB+process.env.DB_CONNECT_OPTION);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
// console.log(process.env.DB_CONNECT_URL+defaultDB+process.env.DB_CONNECT_OPTION)
}

//Routes go here
app.all('*', (req,res) => {
    res.json({"every thing":"is awesome"})
})

//Connect to the database before listening
connectDB().then(() => {
    app.listen(PORT, () => {
        console.log("listening for requests");
    })
})

