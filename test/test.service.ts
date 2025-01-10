import { Injectable } from "@nestjs/common";
import { PrismaService } from "../src/common/prisma.service";
import { Siswa } from "@prisma/client";



@Injectable()

export class TestService{
    constructor(private prismaService : PrismaService){}


    async deleteAll(){
        await this.deleteAllDataSiswa()
    }
    async deleteAllDataSiswa(){
        await this.prismaService.siswa.deleteMany({
            where : {
                nis : 12341
            }
        })
    }

    

    async createDataSiswa(){
        await this.prismaService.siswa.create({
            data : {
                nama : "test",
                nis : 12341,
                jurusan : "pplg",
                rayon : "rayon 1"
            }

        })
    }


    async getUser() : Promise<Siswa>{
       return this.prismaService.siswa.findFirst({
           where : {
               nama : "test"
           }
        })
    }
    

}