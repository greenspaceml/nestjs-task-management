import { Injectable, NotFoundException } from '@nestjs/common';
import { TasksRepository } from './tasks.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskStatus } from './task-status.enum';
import { FilterTaskDto } from './dto/filter-task.dto';
import { User } from '../auth/user.entity';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { UpdateTaskDto } from './dto/update-task.dto';
import { TypeService } from '../type/type.service';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TasksRepository)
    private tasksRepository: TasksRepository,
    // private eventEmitter: EventEmitter2
    private typeService: TypeService
  ) {
  }

  getTasks(filterTaskDto: FilterTaskDto, user: User): Promise<Task[]> {
    return this.tasksRepository.getTasks(filterTaskDto, user);
  }

  async getTaskById(id: string, user: User): Promise<Task> {
    const result = await this.tasksRepository.findOne({ id, user });
    if (!result) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }
    return result;
  }

  async createTask(createTaskDto: CreateTaskDto, user: User): Promise<Task> {
    const type = await this.typeService.getTypeById(createTaskDto.typeId)
    const result = await this.tasksRepository.createTask(createTaskDto, user, type);
    // this.eventEmitter.emit(
    //   'order.created',
    //   user
    // );
    return result;
  }

  async deleteTask(id: string, user: User): Promise<{ id: string }> {
    const result = await this.tasksRepository.delete({ id, user });

    if (result.affected === 0) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }
    return { id };
  }

  async updateTaskStatus(id: string, status: TaskStatus, user: User): Promise<Task> {
    const task = await this.getTaskById(id, user);
    task.status = status;
    await this.tasksRepository.save(task);
    return task;
  }

  async updateTask(id: string, info: UpdateTaskDto, user: User): Promise<Task> {
    const task = await this.getTaskById(id, user);
    task.status = info.status;
    task.title = info.title;
    task.description = info.description;
    await this.tasksRepository.save(task);
    return task;
  }

  // @OnEvent('order.created')
  // handleOrderCreatedEvent(payload: User) {
  //   console.log('Task is created by the user: ', payload.username);
  // }

}
