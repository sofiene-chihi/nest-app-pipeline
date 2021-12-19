import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CourseModule } from './course/course.module';
import { LessonModule } from './lesson/lesson.module';
import { Lesson } from './lesson/lesson.entity';
import { Course } from './course/course.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.HOST,
      port: 3306,
      username: 'root',
      password: 'sofiene',
      database: 'nest_app',
      entities: [Lesson, Course],
      synchronize: true,
    }),
    CourseModule,
    LessonModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
