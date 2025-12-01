// build your `Resource` model here
 const db = require('../../data/dbConfig')

function getResources() {
  return db('resources')
}

function createResource(resource) {
  return db('resources')
    .insert(resource)
    .then(([id]) => db('resources').where('resource_id', id).first())
}

module.exports = {
  getResources,
  createResource
}