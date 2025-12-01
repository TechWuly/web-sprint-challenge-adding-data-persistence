// build your `Project` model here
 const db = require('../../data/dbConfig')

function getProjects() {
  return db('projects')
    .select('project_id', 'project_name', 'project_description', 'project_completed')
    .then(projects => projects.map(project => ({
      ...project,
      project_completed: Boolean(project.project_completed)
    })))
}

function createProject(project) {
  return db('projects')
    .insert({
      ...project,
      project_completed: project.project_completed ? 1 : 0
    })
    .then(([id]) => db('projects').where('project_id', id).first())
    .then(project => ({
      ...project,
      project_completed: Boolean(project.project_completed)
    }))
}

module.exports = {
  getProjects,
  createProject
}