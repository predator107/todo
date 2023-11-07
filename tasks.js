const express = require('express');

const {
    createTask,
    getTasks,
    getTask,
    deleteWorkout,
    updateWorkout
} = require('../controllers/taskcontroller');
const requireAuth = require('../middleware/requireAuth')

const router = express.Router();

router.use(requireAuth)

// GET all tasks
router.get('/',getTasks);

// GET a single task
router.get('/:id',getTask)


// POST new task
router.post('/',createTask);

// DELETE a task
router.delete('/:id',deleteWorkout);

// UPDATE a task
router.patch('/:id',updateWorkout);

module.exports = router;