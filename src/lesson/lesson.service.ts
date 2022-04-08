import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateLessonDto } from './dto/CreateLesson.dto';
import { Lesson } from './lesson.entity';

@Injectable()
export class LessonService {
  constructor(
    @InjectRepository(Lesson) private lessonRepository: Repository<Lesson>,
  ) {}

  async findAll(): Promise<Lesson[]> {
    return await this.lessonRepository.find();
  }

  async getLesson(id: number): Promise<Lesson> {
    return await this.lessonRepository.findOne({ id: id });
  }

  async createLesson(lesson: CreateLessonDto, id): Promise<Lesson> {
    const newLesson: Lesson = this.lessonRepository.create({
      ...lesson,
      course: id,
    });

    return await this.lessonRepository.save(newLesson);
  }
}
