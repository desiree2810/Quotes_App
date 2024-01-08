import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration31704556855637 implements MigrationInterface {
    name = 'Migration31704556855637'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "quote" RENAME COLUMN "created_ats" TO "created_at"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "quote" RENAME COLUMN "created_at" TO "created_ats"`);
    }

}
