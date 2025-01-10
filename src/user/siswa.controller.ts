import { Body, Controller, Get, HttpCode, Post, Param, Delete, Put } from '@nestjs/common';
import { UserService } from './siswa.service';
import { CreateSiswaRequest, SiswaResponse } from '../dto/siswa.dto';
import { retry } from 'rxjs';
import { Siswa } from '@prisma/client';
import { WebResponse } from 'src/dto/web.dto';
@Controller('/api/siswa')
export class UserController {
    constructor(private userService : UserService) {}

    @Post()
    @HttpCode(201)
    async create(@Body() request : CreateSiswaRequest) : Promise<WebResponse<SiswaResponse>> {
        const result = await this.userService.createUser(request)
        return {
            data : result
        }
    }

    @Get()
    async getUsers() : Promise<WebResponse<SiswaResponse[]>> {
        const result = await this.userService.getUsers()
        return {
            data : result 
        }
    }


    @Get(':id')

    async getUserByid(@Param('id') id : string) : Promise<WebResponse<SiswaResponse>> {
        const result = await this.userService.getUserByid(id)
        return {
            data : result 
        }
    }


    @Delete(':id')
    async deleteUser(@Param('id') id : string) : Promise<WebResponse<SiswaResponse>> {
        const result = await this.userService.deleteUser(id)
        return {
            data : result 
        }
    }

    @Put('/update/:id')
    async updateUser(@Param('id') id : string, @Body() request : CreateSiswaRequest) : Promise<WebResponse<SiswaResponse>> {
        const result = await this.userService.updateUser(id, request)
        return {
            data : result
        }
    }
    
}
