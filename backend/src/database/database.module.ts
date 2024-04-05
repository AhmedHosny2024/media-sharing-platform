import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { config } from 'dotenv';
import { User } from '../entities/user.entity';
import { Post } from 'src/entities/post.entity';

config(); // This loads the .env file

/**
 * Database module
 */
const {
  DATABASE_HOST,
  DATABASE_PORT,
  DATABASE_USER,
  DATABASE_PASSWORD,
  DATABASE_NAME,
} = process.env;
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: DATABASE_HOST,
      port: parseInt(DATABASE_PORT),
      username: DATABASE_USER,
      password: DATABASE_PASSWORD,
      database: DATABASE_NAME,
      entities: [User,Post],
      synchronize: true,
      // logging: true, // Enable this to see the SQL queries just for testing
    }),
  ],
})
export class DatabaseModule {}
