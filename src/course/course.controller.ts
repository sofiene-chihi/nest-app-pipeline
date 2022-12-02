import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { GetUser } from 'src/user/getUser.decorator';
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

  @UseGuards(JwtAuthGuard)
  @Get()
  getCourse(@GetUser() user): Promise<Course> {
    return this.courseService.getCourse(user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Post('create')
  createCourse(@Body() createCourseDto: CreateCourseDto, @GetUser() user): Promise<Course> {
    return this.courseService.createCourse(createCourseDto,user.id);
  }
}
