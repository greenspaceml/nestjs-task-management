import { EntityRepository, Repository } from 'typeorm';
import { Task } from './task.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskStatus } from './task-status.enum';
import { FilterTaskDto } from './dto/filter-task.dto';
import { User } from '../auth/user.entity';
import { Type } from '../type/type.entity';

@EntityRepository(Task)
export class TasksRepository extends Repository<Task> {

  async getTasks(filterTaskDto: FilterTaskDto, user: User): Promise<Task[]> {
    const { status, search } = filterTaskDto;
    const query = this.createQueryBuilder('task')
      .leftJoinAndSelect('task.user', 'user', 'task.userId = user.id')
      .leftJoinAndSelect('task.type', 'type', 'task.typeId = type.id')
      .select(['task.*, user.username, type.title as priorityLevel']);
    query.where({
      user: user,
    });
    if (status) {
      query.andWhere('task.status = :status', { status });
    }

    if (search) {
      query.andWhere('(LOWER(task.title) LIKE LOWER(:search) OR LOWER(task.description) LIKE LOWER(:search))',
        { search: `%${search}%` });
    }

    const tasks = await query.getRawMany();
    return tasks;
  }

  async createTask(createTaskDto: CreateTaskDto, user: User, type: Type): Promise<Task> {
    const { title, description } = createTaskDto;
    const task = this.create({
      title: title,
      description: description,
      status: TaskStatus.OPEN,
      user: user,
      type: type,

    });
    await this.save(task);
    return task;
  }
}
