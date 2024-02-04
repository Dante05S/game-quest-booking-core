import { type MigrationInterface, type QueryRunner, TableColumn } from 'typeorm'

export class AddColumnImageEvent1707010045152 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'event',
      new TableColumn({
        name: 'image',
        type: 'varchar',
        isNullable: true,
        default: null
      })
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('event', 'image')
  }
}
