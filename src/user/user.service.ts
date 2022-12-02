import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { UserInfo } from './interfaces/userInfo';
import { User } from './user.entity';
import * as bcrypt from 'bcrypt';
import { Course } from 'src/course/course.entity';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User) private userRepository: Repository<User>,
      ) {}
    

      async findOne(id : string): Promise<User>{
        return this.userRepository.findOne(id)
      }


      async createUser(payload: RegisterDto): Promise<User> {
        const { email, password } = payload;
    
        if (await this.userRepository.findOne({ email })) {
          throw new HttpException(
            {
              message: 'USER_ALREADY_EXISTS',
            },
            HttpStatus.BAD_REQUEST,
          );
        }
    
        try {
          // encrypt password
          const passwordCrypt = await bcrypt.hash(password, 12);
    
          const newUser = await this.userRepository.create({
            firstName : payload.firstName,
            lastName: payload.lastName,
            phone: payload.phone,
            email: payload.email,
            password: passwordCrypt,
          });
    
          return await this.userRepository.save(newUser);
        } catch (err) {
            console.log(err)
          throw new HttpException(
            {
              message: 'ERROR_REGISTER',
            },
            HttpStatus.INTERNAL_SERVER_ERROR,
          );
        }
      }
    
      async loginUser(payload: LoginDto): Promise<User> {
        const { email, password } = payload;
    
        const user = await this.userRepository.findOne({ email });
    
        if (!user) {
          throw new HttpException(
            {
              message: 'USER_NOT_FOUND',
            },
            HttpStatus.NOT_FOUND,
          );
        }
    
        const correctPassword = await bcrypt.compare(password, user.password);
        if (!correctPassword) {
          throw new HttpException(
            {
              message: 'WRONG_PASSWORD',
            },
            HttpStatus.UNAUTHORIZED,
          );
        }
        return user;
      }
    
      async getUserInfo(userId: number): Promise<UserInfo> {
        const user = await this.userRepository.findOne(userId);
        if (!user) {
          throw new HttpException(
            {
              message: 'USER_NOT_FOUND',
            },
            HttpStatus.NOT_FOUND,
          );
        }
        const { firstName, lastName, phone, email } = user;
        return {
          firstName,
          lastName,
          phone,
          email,
        };
      }

}
