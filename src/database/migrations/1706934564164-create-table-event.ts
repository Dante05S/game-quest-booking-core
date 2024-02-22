import { type MigrationInterface, type QueryRunner, Table } from 'typeorm'

export class CreateTableEvent1706934564164 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'event',
        columns: [
          {
            name: 'id',
            type: 'varchar',
            isPrimary: true,
            generationStrategy: 'uuid'
          },
          {
            name: 'name',
            type: 'varchar',
            isNullable: false,
            default: "''"
          },
          {
            name: 'description',
            type: 'text',
            isNullable: false
          },
          {
            name: 'start_date',
            type: 'timestamp',
            isNullable: true
          },
          {
            name: 'available_quotas',
            type: 'int',
            isNullable: false,
            default: 0
          },
          {
            name: 'created_at',
            type: 'timestamp',
            isNullable: false,
            default: 'CURRENT_TIMESTAMP'
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            isNullable: true,
            default: null
          }
        ]
      }),
      true
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('event', true)
  }
}
