import { Body, Controller, Get, HttpCode, Post, Param, Delete, Put, UseGuards } from '@nestjs/common';
import { SiswaService } from './siswa.service';
import { CreateSiswaRequest, SiswaResponse } from './dto/siswa.dto';
import { WebResponse } from 'src/response/web.dto';
import { ApiBearerAuth } from '@nestjs/swagger';
import { AuthMiddleware } from '../common/auth.middleware';
import { Auth } from '../common/auth.decorator';



@UseGuards(AuthMiddleware)
@Controller('/api/siswa')

export class SiswaController {
    constructor(private userService : SiswaService) {}
    
    @Post()
    @HttpCode(201)
    @ApiBearerAuth()
    async create(@Auth() user : any, @Body() request : CreateSiswaRequest) : Promise<WebResponse<SiswaResponse>> {
        const result = await this.userService.createUser(request)
        return {
            data : result
        }
    }
    
    @Get()
    @ApiBearerAuth()
    async getUsers(@Auth() user : any ) : Promise<WebResponse<SiswaResponse[]>> {
        const result = await this.userService.getUsers()
        return {
            data : result 
        }
    }


    @Get(':id')
    @ApiBearerAuth()

    async getUserByid(@Auth() user : any ,@Param('id') id : string) : Promise<WebResponse<SiswaResponse>> {
        const result = await this.userService.getUserByid(id)
        return {
            data : result 
        }
    }


    


    @Delete(':id')
    @ApiBearerAuth()
    async deleteUser(@Auth() user : any ,@Param('id') id : string) : Promise<WebResponse<SiswaResponse>> {
        const result = await this.userService.deleteUser(id)
        return {
            data : result 
        }
    }

    @Put('/update/:id')
    @ApiBearerAuth()
    async updateUser(@Auth() user : any ,@Param('id') id : string, @Body() request : CreateSiswaRequest) : Promise<WebResponse<SiswaResponse>> {
        const result = await this.userService.updateUser(id, request)
        return {
            data : result
        }
    }

    
    
}
