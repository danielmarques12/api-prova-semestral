import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('bootcamps', (table) => {
    table.increments('id').primary().notNullable();
    table.string('name').notNullable();
    table.string('duration').notNullable();
    table.string('location').notNullable();
    table.string('description', 1000).notNullable();

    table
      .integer('coordinator_id')
      .notNullable()
      .references('id')
      .inTable('users')
      .onUpdate('CASCADE')
      .onDelete('SET NULL');

    table
      .integer('file_id')
      .nullable()
      .references('id')
      .inTable('files')
      .onUpdate('CASCADE')
      .onDelete('SET NULL');

    table
      .timestamp('created_at')
      .notNullable()
      .defaultTo(knex.raw('transaction_timestamp()'));
    table
      .timestamp('updated_at')
      .notNullable()
      .defaultTo(knex.raw('transaction_timestamp()'));
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('bootcamps');
}
