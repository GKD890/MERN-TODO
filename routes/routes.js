import express from "express";
import { addOneTask, delOneTask, getOneTask, updateOneTask } from "../services/task.js";


export const router = express.Router();


/* -------------------------------------------------------------------------- */
/*                               Task Controller                              */
/* -------------------------------------------------------------------------- */

router.post("/home/list",async(req,res) =>{
    const listName = req.body.listName;
    const tasks = await getOneTask(listName);
    res.send(tasks);
})

router.post("/home/add",async(req,res) =>{
    console.log(`\n add method accessed`)
    const newTaskTitle = req.body.title;
    const tasks = await addOneTask(newTaskTitle);
    res.send(tasks);
})

router.post("/home/update" ,async(req,res) =>{
    const listId = req.body.listId;
    const taskId = req.body.taskId;
    const updateTask = req.body.updateTask;
    const tasks = await updateOneTask(listId,taskId,updateTask);
    res.send(tasks);
})
router.post("/home/delete",async(req,res) =>{
    const delListId = req.body.listId;
    const delTaskId = req.body.taskId;
    const tasks = await delOneTask(delListId,delTaskId);
    res.send(tasks);
})

