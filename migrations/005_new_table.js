exports.up = function(knex) {
    return knex.schema
        .createTable("collaborators", table => {
            table.increments("id");
            table.datetime("createdAt").defaultTo(knex.fn.now());
            table.datetime("updatedAt").defaultTo(knex.fn.now());
        })
}

exports.down = function(knex) {
    return knex.schema
        .dropTable("collaborators")
}