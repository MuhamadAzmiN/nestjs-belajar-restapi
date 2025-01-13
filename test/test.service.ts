import { Injectable } from "@nestjs/common";
import { PrismaService } from "../src/common/prisma.service";
import { Siswa } from "@prisma/client";
import * as bcrypt from "bcrypt";
import { retry } from "rxjs";



@Injectable()

export class TestService{
    constructor(private prismaService : PrismaService){}


    async deleteAll(){
        await this.deleteAllDataSiswa()
        await this.deleteUser()
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

    async getSiswa() : Promise<Siswa>{
       return this.prismaService.siswa.findFirst({
           where : {
               nama : "test"
           }
        })
    }


    async deleteUser(){
        await this.prismaService.user.deleteMany({
            where : {
                username : "test"
            }
        })
    }

    async createDataUser() {
        await this.prismaService.user.create({
            data : {
                email : "test",
                password : await bcrypt.hash("test", 10),
                username : "test",
                token : "test"
            }
        })  
    }

    async getUser() : Promise<any>{
        return this.prismaService.user.findFirst({
            where : {
                username : "test"
            }
        })
    }
    

}