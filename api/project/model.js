// build your `Project` model here
const db = require('../../data/dbConfig')

async function findAll() {
  const rows = await db('projects')
    .select('project_id', 'project_name', 'project_description', 'project_completed')

  rows.forEach(row => {
    if (row.project_completed) {
      row.project_completed = true
    } else {
      row.project_completed = false
    }
  })

  return rows;
}

async function findByID(project_id) {
  const [row] = await db('projects')
    .select('project_id', 'project_name', 'project_description', 'project_completed')
    .where('project_id', project_id)

  if (row.project_completed) {
    row.project_completed = true
  } else {
    row.project_completed = false
  }
    
  return row
}

async function add(newProject) {
  const [project_id] = await db('projects').insert(newProject)
  const project = await findByID(project_id)

  return project
}

module.exports = {
  findAll,
  add
}