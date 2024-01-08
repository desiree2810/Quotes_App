import { DataSource, DataSourceOptions } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import * as dotenv from 'dotenv';

dotenv.config();

export const dataSourceOptions = async (
  configService: ConfigService,
): Promise<DataSourceOptions> => ({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  synchronize: process.env.DB_SYNC === 'true',
  entities: ['dist/**/*.entity.js'],
  migrations: ['dist/db/migrations/*.js'],
//   logging: true,
});

async function createDataSource() {
  const options = await dataSourceOptions(new ConfigService());
  const dataSource = new DataSource(options);
  console.log(dataSource)
  return dataSource;
}

const dataSource = createDataSource();
export default dataSource;