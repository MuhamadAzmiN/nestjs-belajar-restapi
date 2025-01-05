import { Injectable } from '@nestjs/common';
import { PrismaService } from '../common/prisma.service';
import { CreateSiswaRequest, SiswaResponse } from '../model/siswa.model';
import { SiswValidation } from './user.validation';
import { ValidationService } from '../common/validation.service';
@Injectable()
export class UserService {  
   constructor(
    private prismaService : PrismaService,
    private validationService : ValidationService
   ) {}


   async createUser(request : CreateSiswaRequest) : Promise<SiswaResponse> {
       const createRequest : CreateSiswaRequest = this.validationService.validate(SiswValidation.CREATE, request);
       const siswa = await this.prismaService.siswa.create({data : {...createRequest}});

       return this.toSiswaResponse(siswa)

   }
   toSiswaResponse(siswa : any) : SiswaResponse {
    return {
      id : siswa.id,
      nama : siswa.nama,
      nis : siswa.nis,
      rayon : siswa.rayon,
      jurusan : siswa.jurusan
    }
   }


}
