import { Module } from '@nestjs/common';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TasksRepository } from './tasks.repository';
import { AuthModule } from '../auth/auth.module';
import { TypeService } from '../type/type.service';
import { TypeModule } from '../type/type.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([TasksRepository]),
    AuthModule,
    TypeModule
  ],
  controllers: [TasksController],
  providers: [TasksService]
})
export class TasksModule {
}
