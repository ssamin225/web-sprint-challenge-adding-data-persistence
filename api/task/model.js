// build your `Task` model here
const db = require('../../data/dbConfig')

async function findAll() {
  const rows = await db('tasks as t')
    .leftJoin('projects as p', 't.project_id', 'p.project_id')
    .select(
      't.task_id', 
      't.task_description', 
      't.task_notes', 
      't.task_completed', 
      'p.project_name', 
      'p.project_description'
    )

  rows.forEach(row => {
    if (row.task_completed) {
      row.task_completed = true
    } else {
      row.task_completed = false
    }
  })

  return rows;
}

async function findByID(task_id) {
  const [row] = await db('tasks')
    .select(
      'task_id', 
      'task_description', 
      'task_notes', 
      'task_completed', 
      'project_id'
    )
    .where('task_id', task_id)

  if (row.task_completed) {
    row.task_completed = true
  } else {
    row.task_completed = false
  }
    
  return row
}

async function add(newTask) {
  const [task_id] = await db('tasks').insert(newTask)
  const task = await findByID(task_id)

  return task
}

module.exports = {
  findAll,
  add
}