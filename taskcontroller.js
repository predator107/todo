const Task = require('../models/taskModel');
const mongoose = require('mongoose');

// get all tasks
const getTasks = async(req,res)=>{
    const tasks = await Task.find({}).sort({createdAt:-1});

    res.status(200).json(tasks);
}

// get a single task
const getTask = async(req,res)=>{
    const {id}=req.params;

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error:'No such task'});
    }
    const task = await Task.findById(id);

    if(!task){
        return res.status(404).json({error:'No such task'});
    }

    res.status(200).json(task);
}

// create a task
const createTask = async (req,res) =>{
    const {title,completed} = req.body;

    let emptyFields=[];

    if(!title){
        emptyFields.push('title');
    }
    if(emptyFields.length>0){
        return res.status(400).json({error:'Please fill in the required fields',emptyFields});
    }
    // add doc to db
    try{
        const task = await Task.create({title,completed});
        res.status(200).json(task);
    } catch(error){
        res.status(400).json({error:error.message});
    }
}


// delete a task
const deleteWorkout = async (req,res)=>{
    const {id}=req.params;

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error:' No such task '});
    }

    const task = await Task.findOneAndDelete({_id: id});

    if(!task){
        return res.status(404).json({error:' No such task '});
    }

    res.status(200).json(task);
}

// update a task
const updateWorkout = async(req,res)=>{
    const {id}=req.params;

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error:' No such task '});
    }

    const task = await Task.findOneAndUpdate({_id: id},{
        ...req.body
    })

    if(!task){
        return res.status(404).json({error:' No such task '});
    }

    res.status(200).json(task);

}



module.exports ={
    createTask,
    getTasks,
    deleteWorkout,
    updateWorkout,
    getTask
}