// const mongo = require("mongoose");
import mongoose, { Schema } from "mongoose";
import bodyParser from "body-parser"

const taskSchema = {
    title: String,
    description: String,
    date:{type:Date},
    ifComplete:{type:Boolean, default:false},
}

export const Task = mongoose.model("Task",taskSchema);

const ListSchema = new Schema({
    name:String,
    tasks:[taskSchema]
})

export const List = mongoose.model("List",ListSchema);


export function test(){
    const task1 =  new Task({
        title:"First taks",
        date:Date.now(),
    });
    task1.save();
    const HomeList = new List({
        name:"Home",
        tasks:[task1],
    });
    HomeList.save();

    console.log("save success")
}