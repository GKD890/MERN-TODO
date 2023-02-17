import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import { router } from "./routes/routes.js";
import cors from "cors";

dotenv.config()
const defaultDB = "ExTodo";
const mongoUrl = process.env.DB_CONNECT_URL + defaultDB + process.env.DB_CONNECT_OPTION;
const PORT = process.env.PORT || 3000

const app = express();
app.use(express.urlencoded({extended: true}) );
app.use(cors());
app.use(express.static("frontend/dist"));

const connectDB = async () => {
  try {
    const conn = mongoose.connect(mongoUrl,{
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`MongoDB Connected: ${conn.connection.host}`);
    console.log(`MongoURL: ${mongoUrl}`);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
}

/* ----------------------------- Routes go here ----------------------------- */

app.get("/",(req,res) =>{
  res.sendFile("frontend/dist/index.html")
})

app.use('/api',router);

/* ---------------- Connect to the database before listening ---------------- */
await connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Connected to DB at ${PORT}`);
    })
})

