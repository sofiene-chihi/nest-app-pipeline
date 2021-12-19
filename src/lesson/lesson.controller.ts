import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateLessonDto } from './dto/CreateLesson.dto';
import { Lesson } from './lesson.entity';
import { LessonService } from './lesson.service';

@Controller('lesson')
export class LessonController {
  constructor(private readonly lessonService: LessonService) {}

  @Get('all')
  all(): Promise<Lesson[]> {
    return this.lessonService.findAll();
  }

  @Get(':id')
  getLesson(@Param('id') id): Promise<Lesson> {
    return this.lessonService.getLesson(id);
  }

  @Post('create')
  createLesson(@Body() createLessonDto: CreateLessonDto): Promise<Lesson> {
    return this.lessonService.createLesson(createLessonDto);
  }
}
