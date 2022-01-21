// build your `Resource` model here
const db = require('../../data/dbConfig')

async function findAll() {
  const rows = await db('resources')
    .select('resource_id', 'resource_name', 'resource_description')

  return rows;
}

async function findByID(resource_id) {
  const [row] = await db('resources')
    .select('resource_id', 'resource_name', 'resource_description')
    .where('resource_id', resource_id)

  return row
}

async function add(newResource) {
  const [resource_id] = await db('resources').insert(newResource)
  const resource = await findByID(resource_id)

  return resource
}

module.exports = {
  findAll,
  add
}