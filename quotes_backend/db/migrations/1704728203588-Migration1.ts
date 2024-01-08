import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration11704728203588 implements MigrationInterface {
    name = 'Migration11704728203588'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "updated_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "first_name" character varying NOT NULL, "last_name" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "isActive" boolean NOT NULL DEFAULT true, CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "quote" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "updated_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "quote" character varying NOT NULL, "author" character varying NOT NULL, "like" integer NOT NULL, "dislikes" integer NOT NULL, "tag" character varying NOT NULL, "user_id" uuid NOT NULL, CONSTRAINT "PK_b772d4cb09e587c8c72a78d2439" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user_quote_reaction" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "like" boolean NOT NULL, "dislikes" boolean NOT NULL, "quoteId" uuid NOT NULL, "userId" uuid NOT NULL, CONSTRAINT "PK_0ea391e8cf30bf347cefebf349a" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "quote" ADD CONSTRAINT "FK_c8921e59393636e1dcfb537e052" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_quote_reaction" ADD CONSTRAINT "FK_8973468face903c9d336c06288a" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_quote_reaction" ADD CONSTRAINT "FK_1bfa997ea95d408c5f1f973a3c8" FOREIGN KEY ("quoteId") REFERENCES "quote"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_quote_reaction" DROP CONSTRAINT "FK_1bfa997ea95d408c5f1f973a3c8"`);
        await queryRunner.query(`ALTER TABLE "user_quote_reaction" DROP CONSTRAINT "FK_8973468face903c9d336c06288a"`);
        await queryRunner.query(`ALTER TABLE "quote" DROP CONSTRAINT "FK_c8921e59393636e1dcfb537e052"`);
        await queryRunner.query(`DROP TABLE "user_quote_reaction"`);
        await queryRunner.query(`DROP TABLE "quote"`);
        await queryRunner.query(`DROP TABLE "user"`);
    }

}
