import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Course } from './course.entity';
import { CreateCourseDto } from './dto/CreateCourse.dto';

@Injectable()
export class CourseService {
  constructor(
    @InjectRepository(Course) private courseRepository: Repository<Course>,
  ) {}

  async findAll(): Promise<Course[]> {
    return await this.courseRepository.find();
  }

  async getCourse(id: number): Promise<Course> {
    return await this.courseRepository.findOne({ id: id });
  }

  async createCourse(course: CreateCourseDto): Promise<Course> {
    const newCourse: Course = this.courseRepository.create(course);

    return await this.courseRepository.save(newCourse);
  }
}
