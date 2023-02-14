import express from "express";
import { addOneTask, delOneTask, getOneTask, updateOneTask } from "../services/task.js";


export const router = express.Router();


/* -------------------------------------------------------------------------- */
/*                               Task Controller                              */
/* -------------------------------------------------------------------------- */

router.post("/home/list" ,async(req,res) =>{
    const listName = req.body.listName;
    const tasks = await getOneTask(listName);
    res.send(tasks);
})

router.post("/home/add" ,async(req,res) =>{
    const newTask = req.body.newTask;
    const tasks = await addOneTask(newTask);
    res.send(tasks);
})

router.post("/home/update" ,async(req,res) =>{
    const taskId = req.body.taskId;
    const updateTask = req.body.updateTask;
    const tasks = await updateOneTask(taskId,updateTask);
    res.send(tasks);
})
router.post("/home/delete" ,async(req,res) =>{
    const delTaskId = req.body.taskId;
    const tasks = await delOneTask(delTaskId);
    res.send(tasks);
})

