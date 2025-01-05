import { Body, Controller, Get, HttpCode, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateSiswaRequest } from '../model/siswa.model';
import { retry } from 'rxjs';
@Controller('/api/siswa')
export class UserController {
    constructor(private userService : UserService ) {}

    @Post()
    @HttpCode(200)
    async create(@Body() request : CreateSiswaRequest) : Promise<any> {
        const result = await this.userService.createUser(request)
        return {
            data : result
        }
    }
}
