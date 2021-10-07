import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task } from './task.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskStatusDto } from './dto/update-task-status.dto';
import { FilterTaskDto } from './dto/filter-task.dto';
import { GetUser } from '../auth/get-user.decorator';
import { User } from '../auth/user.entity';
import { AuthGuard } from '@nestjs/passport';
import { UpdateTaskDto } from './dto/update-task.dto';

@Controller('tasks')
@UseGuards(AuthGuard())
export class TasksController {
  constructor(
    private taskService: TasksService
  ) {
  }

  @Get()
  getTasks(
    @Query() filterTaskDto: FilterTaskDto,
    @GetUser() user: User
  ): Promise<Task[]> {
    return this.taskService.getTasks(filterTaskDto, user);
  }


  @Get('/:id')
  getTaskById(
    @Param('id') id: string,
    @GetUser() user: User
  ): Promise<Task> {
    return this.taskService.getTaskById(id, user);
  }

  @Post()
  createTask(
    @Body() createTaskDto: CreateTaskDto,
    @GetUser() user: User
  ): Promise<Task> {
    return this.taskService.createTask(createTaskDto, user);
  }

  @Patch('/:id/status')
  updateTaskStatus(
    @Param('id') id: string,
    @Body() updateTaskStatusDto: UpdateTaskStatusDto,
    @GetUser() user: User
  ): Promise<Task> {
    const { status } = updateTaskStatusDto;
    return this.taskService.updateTaskStatus(id, status, user);
  }

  @Patch('/:id/update')
  updateTask(
    @Param('id') id: string,
    @Body() updateTaskDto: UpdateTaskDto,
    @GetUser() user: User
  ): Promise<Task> {
    return this.taskService.updateTask(id, updateTaskDto, user);
  }

  @Delete('/:id')
  deleteTask(
    @Param('id') id: string,
    @GetUser() user: User
  ): Promise<{ id: string }> {
    return this.taskService.deleteTask(id, user);
  }

}
