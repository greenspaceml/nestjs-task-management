import { Module } from '@nestjs/common';
import { TasksModule } from './tasks/tasks.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { TypeModule } from './type/type.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [`.env.stage.dev`]
    }),
    TasksModule,
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DB_HOST'),
        port: configService.get('DB_PORT'),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_DATABASE'),
        autoLoadEntities: true,
        synchronize: true
      })
    }),
    AuthModule,
    EventEmitterModule.forRoot({
      // // set this to `true` to use wildcards
      // wildcard: false,
      // // the delimiter used to segment namespaces
      // delimiter: '.',
      // // set this to `true` if you want to emit the newListener event
      // newListener: false,
      // // set this to `true` if you want to emit the removeListener event
      // removeListener: false,
      // // the maximum amount of listeners that can be assigned to an event
      // maxListeners: 10,
      // // show event name in memory leak message when more than maximum amount of listeners is assigned
      // verboseMemoryLeak: false,
      // // disable throwing uncaughtException if an error event is emitted and it has no listeners
      // ignoreErrors: false,
    }),
    TypeModule,
  ]
})
export class AppModule {
}
