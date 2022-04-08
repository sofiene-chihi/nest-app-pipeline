import { Test, TestingModule } from '@nestjs/testing';
import { CourseController } from './course.controller';
import { CourseService } from './course.service';
import { CreateCourseDto } from './dto/CreateCourse.dto';

describe('CourseController', () => {
  let controller: CourseController;
  let spyService: CourseService;
  beforeAll(async () => {
    const ApiServiceProvider = {
      provide: CourseService,
      useFactory: () => ({
        findAll: jest.fn(() => []),
        createCourse: jest.fn((dto) => {
          return {
            id: Date.now(),
            ...dto,
          };
        }),
        getCourse: jest.fn((id) => {}),
      }),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [CourseController],
      providers: [CourseService,ApiServiceProvider],
    }).compile();

    controller = module.get<CourseController>(CourseController);
    spyService = module.get<CourseService>(CourseService);

  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a course', () => {
    const dto = new CreateCourseDto();
    expect(controller.createCourse(dto)).toEqual({
      id: expect.any(Number),
      ...dto,
    });
    expect(spyService.createCourse).toHaveBeenCalledWith(dto);
  });
});
