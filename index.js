import express from "express";
// import { urlencoded } from "body-parser";
import { connect } from "mongoose";
import {  test } from "./database/Task.js";


// const PORT = 3000;
const PORT = process.env.PORT || 3000;

const app = express();

// app.use(static(path.joing))
app.set('view engine', 'jsx');

// app.use(urlencoded({extended: true}));
// app.use(static("public"));

const mongo = connect("mongodb+srv://bfkp23:Cr6xLVbbFKP7CcT@cluster0.x9tdwdh.mongodb.net/ExTodo?retryWrites=true&w=majority",{useNewUrlParser: true},()=>{
    console.log("Connected to MongoDB Atlas.");
    test();
})

// app.get('/',(res,req) => {
    
// })

app.listen(PORT,()=>{
    console.log("Listening to port: 3000...");
    
})

