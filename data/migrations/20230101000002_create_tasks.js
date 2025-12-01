exports.up = function(knex) {
  return knex.schema.createTable('tasks', table => {
    table.increments('task_id')
    table.text('task_description').notNullable()
    table.text('task_notes')
    table.integer('task_completed').defaultTo(0)
    table.integer('project_id')
      .notNullable()
      .unsigned()
      .references('project_id')
      .inTable('projects')
      .onDelete('CASCADE')
      .onUpdate('CASCADE')
  })
}

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('tasks')
}