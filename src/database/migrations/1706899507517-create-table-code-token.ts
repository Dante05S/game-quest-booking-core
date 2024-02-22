import {
  type MigrationInterface,
  type QueryRunner,
  Table,
  TableForeignKey
} from 'typeorm'

export class CreateTableCodeToken1706899507517 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'code_token',
        columns: [
          {
            name: 'id',
            type: 'varchar',
            isPrimary: true,
            generationStrategy: 'uuid'
          },
          {
            name: 'code',
            type: 'varchar',
            isNullable: false,
            default: "''"
          },
          {
            name: 'expire_at',
            type: 'timestamp',
            isNullable: false,
            default: null
          },
          {
            name: 'user_id',
            type: 'varchar',
            isNullable: false
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
      'code_token',
      new TableForeignKey({
        name: 'code_token_user_id_fk',
        columnNames: ['user_id'],
        referencedTableName: 'user',
        referencedColumnNames: ['id'],
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      })
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('code_token', 'code_token_user_id_fk')
    await queryRunner.dropTable('code_token', true)
  }
}
