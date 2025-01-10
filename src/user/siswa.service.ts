import { HttpException, Injectable } from '@nestjs/common';
import { PrismaService } from '../common/prisma.service';
import { CreateSiswaRequest, SiswaResponse } from '../dto/siswa.dto';
import { SiswaValidation } from './siswa.validation';
import { ValidationService } from '../common/validation.service';
import { retry } from 'rxjs';
import { Siswa } from '@prisma/client';

@Injectable()
export class UserService {  
   constructor(
    private prismaService : PrismaService,
    private validationService : ValidationService
   ) {}


   

   async createUser(request : CreateSiswaRequest) : Promise<SiswaResponse> {
       const createRequest : CreateSiswaRequest = this.validationService.validate(SiswaValidation.CREATE, request);
       const siswa = await this.prismaService.siswa.create({data : {...createRequest}});

       return this.toSiswaResponse(siswa)

   }



   async getUsers() : Promise<SiswaResponse[]> {
       const siswa = await this.prismaService.siswa.findMany({});
       if(siswa.length === 0){
           return []
       }     

       return siswa.map(siswa => this.toSiswaResponse(siswa))
   }

   async checkSiswaExist(id : string) : Promise<any> {
    const siswa = await this.prismaService.siswa.findUnique({
        where : {
            id : id
        }
    })


    if(!siswa){
    throw new HttpException('Siswa not found', 404)
    }

    return siswa
   }

   async getUserByid(id : string) : Promise<SiswaResponse>{
    const siswa = await this.checkSiswaExist(id)
    return this.toSiswaResponse(siswa)
   }


   async deleteUser(id : string) : Promise<SiswaResponse> {
       const siswa = await this.checkSiswaExist(id)
       return this.toSiswaResponse(await this.prismaService.siswa.delete({where : {id : id}}))
   }


   async updateUser(id : string, request : CreateSiswaRequest) : Promise<SiswaResponse> {
       const siswa = await this.checkSiswaExist(id)
       return this.toSiswaResponse(await this.prismaService.siswa.update({where : {id : id}, data : {...request}}))
   }




   toSiswaResponse(siswa : any) : SiswaResponse {
    return {
        id : siswa.id,
        nis : siswa.nis,
        nama : siswa.nama,
        rayon : siswa.rayon,
        jurusan : siswa.jurusan
    }
   }




}
