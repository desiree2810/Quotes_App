import { DataSource, DataSourceOptions } from 'typeorm';
import { ConfigService } from '@nestjs/config';

export const dataSourceOptions = async (
  configService: ConfigService,
): Promise<DataSourceOptions> => ({
  type: 'postgres',
  host: configService.get<string>('DB_HOST'),
  port: configService.get<number>('DB_PORT'),
  username: configService.get<string>('DB_USERNAME'),
  password: configService.get<string>('DB_PASSWORD'),
  database: configService.get<string>('DB_DATABASE'),
  synchronize: configService.get<boolean>('DB_SYNC'),
  entities: ['dist/**/*.entity.js'],
  migrations: ['dist/db/migrations/*.js'],
//   logging: true,
});

// const dataSource = new DataSource(await dataSourceOptions(new ConfigService()));
// export default dataSource;

async function createDataSource() {
  const options = await dataSourceOptions(new ConfigService());
  const dataSource = new DataSource(options);
  return dataSource;
}

const dataSource = createDataSource();
export default dataSource;

// import { DataSource, DataSourceOptions } from 'typeorm';
// export const dataSourceOptions: DataSourceOptions = {
//   // TypeORM PostgreSQL DB Drivers
//     type: 'postgres',
//     host: 'localhost',
//     port: 5432,
//     username: 'postgres',
//     password: 'root',
//     database: 'MigrationDB',
//     synchronize: false,
//     entities: ['dist/**/*.entity.js'],
//     migrations: ['dist/db/migrations/*.js'],
//     logging: true,
// };

// const dataSource = new DataSource(dataSourceOptions)
// export default dataSource
