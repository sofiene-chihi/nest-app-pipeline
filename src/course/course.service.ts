import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/user.entity';
import { UserService } from 'src/user/user.service';
import { Repository } from 'typeorm';
import { Course } from './course.entity';
import { CreateCourseDto } from './dto/CreateCourse.dto';

@Injectable()
export class CourseService {
  constructor(
    @InjectRepository(Course) private courseRepository: Repository<Course>,
    private readonly userService: UserService
  ) {}

  async findAll(): Promise<Course[]> {
    return await this.courseRepository.find();
  }

  async getCourse(id: number): Promise<Course> {
    return await this.courseRepository.findOne(id , {
      relations: [
        "lessons"
      ],
    });
  }

  async createCourse(course: CreateCourseDto,id:string): Promise<Course> {
    const newCourse: Course = this.courseRepository.create(course);

    const user:User = await this.userService.findOne(id)
    newCourse.users=[user]
    return await this.courseRepository.save(newCourse);
  }
}
