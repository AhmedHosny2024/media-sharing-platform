import { Module } from '@nestjs/common';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';
import { DatabaseModule } from './database/database.module';
import { EnvModule } from './env/env.mdoule';
import { PostModule } from './modules/post/post.module';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  imports: [
      EnvModule,
      DatabaseModule,
      AuthModule,
      UserModule,
      PostModule,
      MulterModule.register({
        dest: './uploads',
      }),
    ],
  controllers: [],
  providers: [],
})
export class AppModule {}
