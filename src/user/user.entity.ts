import { IsEmail, IsNumber } from 'class-validator';
import { Course } from 'src/course/course.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { RoleEnum } from './role.enum';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ unique: true, length: 8 })
  @IsNumber()
  phone: string;

  @Column({ unique: true })
  @IsEmail()
  email: string;

  @Column()
  password: string;

  @Column({ type: 'enum', default: RoleEnum.USER, enum: RoleEnum })
  role: string;

  @ManyToMany(() => Course, (course) => course.users)
  @JoinTable()
  courses: Course[];
}
