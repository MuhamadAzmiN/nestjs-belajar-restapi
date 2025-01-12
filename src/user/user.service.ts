import { HttpException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UserResponse } from './dto/response-user';
import { PrismaService } from '../common/prisma.service';
import { ValidationService } from '../common/validation.service';
import { UserValidation } from './user.validation';
import * as bcrypt from 'bcrypt';
import { v4 as uuid } from 'uuid';
import { User } from '@prisma/client';
import { retry } from 'rxjs';
@Injectable()
export class UserService {
  constructor(
    private prismaService : PrismaService,
    private validationService : ValidationService
  ){}

 async register(request :CreateUserDto) : Promise<UserResponse> {
  const registerRequest : CreateUserDto = this.validationService.validate(UserValidation.REGISTER, request)
  const totalUserInDatabase = await this.prismaService.user.count({
    where : {
      email : registerRequest.email
    }
  })


  if(totalUserInDatabase != 0){
    throw new HttpException("Username Already Exist", 400)
  }

 registerRequest.password = await bcrypt.hash(registerRequest.password, 10)

  const user = await this.prismaService.user.create({
    data : registerRequest
  })

  return {
    username : user.username,
    email : user.email
  }
 }

 async login(request : CreateUserDto) : Promise<UserResponse> {
  const loginRequest : CreateUserDto = this.validationService.validate(UserValidation.LOGIN, request)
  let user = await this.prismaService.user.findUnique({
    where : {
      email : loginRequest.email
    }
  })

  if(!user){
    throw new HttpException("User Not Found", 404)
  }

  const isPasswordValid = await bcrypt.compare(loginRequest.password, user.password)

  if(!isPasswordValid){
    throw new HttpException("Invalid Password", 400)
  }


  user = await this.prismaService.user.update({
    where : {
      email : loginRequest.email
    },
    data : {
      token : uuid()
    }
  })
  return {
    username : user.username,
    email : user.email,
    token : user.token
  }
 }

 async getUser(user : User) : Promise<UserResponse>{
  return {
    username : user.username,
    email : user.email
  }
 }

async logout(user : User) : Promise<UserResponse> {
  const result = await this.prismaService.user.update({
   where : {
    id : user.id
   }, 
   data : {
    token : null
   }
  })

  return {
    username : result.username,
    email : result.email
  }
}


 
}


