import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { Course } from './course.entity';
import { CourseService } from './course.service';
import { CreateCourseDto } from './dto/CreateCourse.dto';

@Controller('course')
export class CourseController {
  constructor(private readonly courseService: CourseService) {}

  @Get('all')
  all(): Promise<Course[]> {
    return this.courseService.findAll();
  }

  @Get(':id')
  getCourse(@Param('id') id): Promise<Course> {
    return this.courseService.getCourse(id);
  }

  @Post('create')
  createCourse(@Body() createCourseDto: CreateCourseDto): Promise<Course> {
    return this.courseService.createCourse(createCourseDto);
  }
}
