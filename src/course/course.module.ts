import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CourseController } from './course.controller';
import { Course } from './course.entity';
import { CourseService } from './course.service';

@Module({
  imports: [TypeOrmModule.forFeature([Course])],
  controllers: [CourseController],
  providers: [CourseService],
})
export class CourseModule {}
