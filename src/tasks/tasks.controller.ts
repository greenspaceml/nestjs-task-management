import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task } from './task.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskStatusDto } from './dto/update-task-status.dto';
import { FilterTaskDto } from './dto/filter-task.dto';

@Controller('tasks')
export class TasksController {
  constructor(
    private taskService: TasksService
  ) {
  }

  @Get()
  getTasks(@Query() filterTaskDto: FilterTaskDto): Promise<Task[]> {
    return this.taskService.getTasks(filterTaskDto);
  }


  @Get('/:id')
  getTaskById(@Param('id') id: string): Promise<Task> {
    return this.taskService.getTaskById(id);
  }

  @Post()
  createTask(@Body() createTaskDto: CreateTaskDto): Promise<Task> {
    return this.taskService.createTask(createTaskDto);
  }

  @Patch('/:id/status')
  updateTaskStatus(
    @Param('id') id: string,
    @Body() updateTaskStatusDto: UpdateTaskStatusDto
  ): Promise<Task> {
    const { status } = updateTaskStatusDto;
    return this.taskService.updateTaskStatus(id, status);
  }

  @Delete('/:id')
  deleteTask(@Param('id') id: string): Promise<void> {
    return this.taskService.deleteTask(id);
  }

}
