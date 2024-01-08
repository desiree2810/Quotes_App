import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration21704556785163 implements MigrationInterface {
    name = 'Migration21704556785163'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "quote" RENAME COLUMN "created_at" TO "created_ats"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "quote" RENAME COLUMN "created_ats" TO "created_at"`);
    }

}
