import { Table, type MigrationInterface, type QueryRunner } from 'typeorm'

export class CreateTableAdmin1706899595292 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'admin',
        columns: [
          {
            name: 'id',
            type: 'varchar',
            isPrimary: true,
            generationStrategy: 'uuid'
          },
          {
            name: 'first_name',
            type: 'varchar',
            isNullable: false,
            default: "''"
          },
          {
            name: 'last_name',
            type: 'varchar',
            isNullable: false,
            default: "''"
          },
          {
            name: 'email',
            type: 'varchar',
            isNullable: false,
            default: "''",
            isUnique: true
          },
          {
            name: 'password',
            type: 'varchar',
            isNullable: false,
            default: "''"
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
    await queryRunner.dropTable('admin', true)
  }
}
