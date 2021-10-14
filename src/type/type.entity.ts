import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Task } from '../tasks/task.entity';
import { Exclude } from 'class-transformer';

@Entity()
export class Type {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @OneToMany((_type) => Task,
    (task) => task.type,
    { eager: false })
  @Exclude({ toPlainOnly: true })
  tasks: Task;
}
