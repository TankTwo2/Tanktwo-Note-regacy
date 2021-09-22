import { ConfigModule } from '@nestjs/config';
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NoteModule } from './note/ note.module';
import { LoggerMiddleware } from './logger.middleware';

const env = process.env.NODE_ENV;

@Module({
  imports: [
    NoteModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
      // ignoreEnvFile: env === 'prod',
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DATABASE_HOST,
      port: Number(process.env.DATABASE_PORT),
      username: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: env === 'dev' ? 'TTS_DATABASE_DEV' : 'TTS_DATABASE',
      synchronize: true,
      logging: 'all',
      logger: 'file',
      autoLoadEntities: true,
      entities: ['entity/**/**{.ts,.js}'],
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
