import { Task, List } from "../models/task.js"

export const addOneTask = async (task) => {
    console.log("Adding...\n");
    const q = await Task.create(task);
    return q;
}

export const getOneTask = async (listName) =>{
    console.log("Getting...\n");
    const q = await List.find({name:listName});  // return a Query
    const l =  q.map((n)=>{return n.tasks});
    return l;
}

export const updateOneTask = async (taskId,updateTask) => {
    console.log("Updating...")
    const q = await Task.findByIdAndUpdate({_id:taskId},updateTask,{new:true});
    return q;
}

export const delOneTask = async (taskId) => {
    // const q = await List.find({name:list}).exec(); 
    console.log("Deleting...\n");
    const q = await Task.findByIdAndDelete(taskId);
    return q;
}