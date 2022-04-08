import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { getRepository } from 'typeorm';
import { Course } from './course.entity';
import { CourseService } from './course.service';
import { CreateCourseDto } from './dto/CreateCourse.dto';

describe('CourseService', () => {
  let service: CourseService;

  const mockCourseRepo = {
    create : jest.fn().mockImplementation(dto => dto),
    save : jest.fn().mockImplementation(course => Promise.resolve({id: Date.now(), ...course}))
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CourseService, {
        provide: getRepositoryToken(Course),
        useValue : mockCourseRepo
      }],
    }).compile();

    service = module.get<CourseService>(CourseService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it("should create a course and return that", async ()=>{
    const dto = new CreateCourseDto()
    expect(await service.createCourse(dto)).toEqual({
      id: expect.any(Number),
      ...dto
    })
  })
});
