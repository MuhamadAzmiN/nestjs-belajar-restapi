import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, Put } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserResponse } from './dto/response-user';
import { NextFunction } from 'express';
import { request } from 'http';
import { WebResponse } from 'src/response/web.dto';
import { Auth } from '../common/auth.decorator';
import { retry } from 'rxjs';
import { ApiBearerAuth } from '@nestjs/swagger';
import { AppModule } from 'src/app.module';

@Controller('/api/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/register')
  @HttpCode(201)
  async register(@Body() request : CreateUserDto) : Promise<WebResponse<UserResponse>>{
    const result = await this.userService.register(request)
    return {
      data : result
    }
  }

  @Post('/login')
  @HttpCode(200)
  
  async login(@Body() request : CreateUserDto) : Promise<WebResponse<UserResponse>>{
    const result = await this.userService.login(request)
    return {
      data : result
    }
  }


  @Get('/me')
  @HttpCode(200)
  @ApiBearerAuth()

  async get(@Auth() user : any) : Promise<WebResponse<UserResponse>>{
    const result = await this.userService.getUser(user)
    return {
      data : result
    }
  }


  @Delete('/logout')
  @HttpCode(200)
  @ApiBearerAuth()

  async logout(@Auth() user : any) : Promise<WebResponse<UserResponse>>{
    const result = await this.userService.logout(user)
    return {
      data : result
    }
  }





  


}

