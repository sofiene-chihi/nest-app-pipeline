import { Lesson } from '../lesson/lesson.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

@Entity()
export class Course {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  title: string;
  @Column()
  description: string;

  @OneToMany(() => Lesson, (lesson) => lesson.course)
  lessons: Lesson[];
}
