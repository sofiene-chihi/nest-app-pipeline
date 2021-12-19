import { Course } from 'src/course/course.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';

@Entity()
export class Lesson {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  title: string;
  @Column()
  description: string;
  @Column()
  text: string;

  @ManyToOne(() => Course, (course) => course.lessons)
  course: Course;
}
