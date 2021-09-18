import { Injectable, NotFoundException } from '@nestjs/common';
import { Task, TaskStatus } from './task.model';
import { v4 as uuid } from 'uuid';
import { CreateTaskDto } from './dto/create-task.dto';
import { FilterTaskDto } from './dto/filter-task.dto';

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  getAllTasks(): Task[] {
    return this.tasks;
  }

  getTasksWithFilters(filterTaskDto: FilterTaskDto): Task[] {
    const { status, search } = filterTaskDto;

    let tasks = this.getAllTasks();

    if (status) {
      tasks = tasks.filter((task) => task.status === status);
    }

    if (search) {
      tasks = tasks.filter(task => {
        if (task.title.toLocaleLowerCase().includes(search) || task.description.toLocaleLowerCase().includes(search)) {
          return true;
        }
        return false;
      });
    }
    return tasks;
  }

  getTaskById(id: string): Task {
    const result = this.tasks.find((task) => task.id === id);
    if (!result) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }
    return result;
  }

  createTask(createTaskDto: CreateTaskDto): Task {
    const { title, description } = createTaskDto;
    const task: Task = {
      id: uuid(),
      title: title,
      description: description,
      status: TaskStatus.OPEN
    };
    this.tasks.push(task);
    return task;
  }

  deleteTask(id: string): void {
    const taskFound = this.getTaskById(id);
    this.tasks = this.tasks.filter(t => t.id !== taskFound.id);
  }

  updateTaskStatus(id: string, status: TaskStatus): Task {
    const task = this.getTaskById(id);
    task.status = status;
    return task;
  }

}
