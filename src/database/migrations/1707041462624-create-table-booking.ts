import {
  type MigrationInterface,
  type QueryRunner,
  Table,
  TableForeignKey
} from 'typeorm'

export class CreateTableBooking1707041462624 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'booking',
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
            name: 'status',
            type: 'enum',
            enum: ['ACTIVE', 'CANCEL'],
            default: "'ACTIVE'"
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
      'booking',
      new TableForeignKey({
        name: 'booking_user_id_fk',
        columnNames: ['user_id'],
        referencedTableName: 'user',
        referencedColumnNames: ['id'],
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      })
    )

    await queryRunner.createForeignKey(
      'booking',
      new TableForeignKey({
        name: 'booking_event_id_fk',
        columnNames: ['event_id'],
        referencedTableName: 'event',
        referencedColumnNames: ['id'],
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      })
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('booking', 'booking_event_id_fk')
    await queryRunner.dropForeignKey('booking', 'booking_user_id_fk')
    await queryRunner.dropTable('booking', true)
  }
}
