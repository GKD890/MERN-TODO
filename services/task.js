import { Task, List } from "../models/task.js"

export const addOneTask = async (taskTitle) => {
    console.log("Adding...\n");
    const newTask = new Task({
        title:taskTitle,
        date:Date.now(),
    })
    
    // const newlist= await List.findOne({name:"Home"}).then(async(tlist) =>{
    //     let out;
    //     let completList=await Task.create(newTask,
    //         async(err,task) =>{
    //         if(err){
    //             console.log(`add error:${err}`)
    //         } else {
    //             tlist.tasks.push(task);
    //             const l = await tlist.save()
    //             completList = l;
    //             // console.log(completList)
    //         }
    //     })
    //     console.log(completList)
    //     return completList
    // }).catch((e) =>{console.log(e)});

    const addlist = await Task.create(newTask).then(async(task) =>{
        const list = await List.findOne({name:"Home"}).then(async(list) =>{
            list.tasks.push(task);
            const savedList = await list.save()
            return savedList
        })
        return list
    })

    return addlist;
}

export const getOneTask = async (listName) =>{
    console.log("Getting...\n");
    const list = await List.findOne({name:listName});
    const taskList = list;
    return taskList;
}

export const updateOneTask = async (listId,taskId,updateTask) => {
    const delTask =await  List.findOneAndUpdate(
        {_id:listId,"tasks._id": taskId},
        { $set: { "tasks.$.title": updateTask.title ,"tasks.$.ifComplete": updateTask.ifComplete, "tasks.$.description": updateTask.description } },
        {new: true }
        // arrayFilters:[{"elem._id":taskId}],
        );
    console.log(`updating list: ${listId} -> task @ ${taskId} \n`)

    await Task.findByIdAndUpdate(taskId,{ $set: { title: updateTask.title ,ifComplete: updateTask.ifComplete, description: updateTask.description } });

    return delTask;
}

export const delOneTask = async (listId,taskId) => {
    // let delTask;
    // const q = await List.find({name:list}).exec(); 
    // List.findOne({name:"Home"}).then((tlist) =>{
    //     console.log(`origin list: ${tlist.tasks.length}`)
    //     tlist.tasks.filter((task=>task._id !== taskId));
    //     tlist.save();
    //     console.log(`modified list: ${tlist.tasks.length}`)
    //     Task.findByIdAndDelete(taskId,
    //     //     (err,task) =>{
    //     //     if(err){
    //     //         console.log(`add error:${err}`)
    //     //     } else {
    //     //         delTask = task;
    //     //         console.log(`Delete ${delTask}\n`);
    //     //         return delTask;
    //     //     }
    //     // }
    //     )
        
    // }).catch((e) =>{console.log(e)})
    console.log(`del: ${listId} -> ${taskId}`)
    const delTask = List.findByIdAndUpdate(listId, { $pull: { tasks: {_id:taskId} } }, { new: true });
    await Task.findByIdAndDelete(taskId);
    // const q = await Task.findByIdAndDelete(taskId);
    // return q;
    return delTask;
}