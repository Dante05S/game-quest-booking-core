import {
  Table,
  type MigrationInterface,
  type QueryRunner,
  TableForeignKey
} from 'typeorm'

export class CreateTableRate1707070048823 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'rate',
        columns: [
          {
            name: 'id',
            type: 'varchar',
            isPrimary: true,
            generationStrategy: 'uuid'
          },
          {
            name: 'user_id',
            type: 'varchar',
            isNullable: false
          },
          {
            name: 'event_id',
            type: 'varchar',
            isNullable: false
          },
          {
            name: 'comment',
            type: 'text',
            isNullable: false
          },
          {
            name: 'score',
            type: 'tinyint',
            isNullable: true,
            default: null
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

    await queryRunner.createForeignKey(
      'rate',
      new TableForeignKey({
        name: 'rate_user_id_fk',
        columnNames: ['user_id'],
        referencedTableName: 'user',
        referencedColumnNames: ['id'],
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      })
    )

    await queryRunner.createForeignKey(
      'rate',
      new TableForeignKey({
        name: 'rate_event_id_fk',
        columnNames: ['event_id'],
        referencedTableName: 'event',
        referencedColumnNames: ['id'],
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      })
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('rate', 'rate_event_id_fk')
    await queryRunner.dropForeignKey('rate', 'rate_user_id_fk')
    await queryRunner.dropTable('rate', true)
  }
}
