import { INestApplication } from "@nestjs/common"
import { TestService } from "./test.service"
import { AppModule } from "../src/app.module"
import { Test, TestingModule } from "@nestjs/testing"
import { TestModule } from "./test.module"
import * as request from "supertest"
import { after } from "node:test"
import { exec } from "child_process"
import exp from "constants"
import { response } from "express"

describe('User Controller', () => {
    let app : INestApplication
    let testService : TestService
  
  
    beforeEach(async () => {
      const moduleFixture: TestingModule = await Test.createTestingModule({
        imports: [AppModule, TestModule],
      }).compile();
  
      app = moduleFixture.createNestApplication();
      await app.init()
      testService = app.get(TestService);
    });

    describe('POST /api/user', () => {
        beforeEach(async () => {
            await testService.deleteAll()
        })

        it('should register user' , async () => {
            const response = await request(app.getHttpServer()).post('/api/user/register').send({
                username : "test",
                email : "test",
                password : "test"
            })
            console.log(response.body)
            expect(response.statusCode).toBe(201)
        })
    })


    describe('/POST /api/user/login', () => {
      beforeEach(async () => {
          await testService.deleteAll()
          await testService.createDataUser()
      })
      it('should login user', async () => {
          const response = await request(app.getHttpServer()).post('/api/user/login').send({
              email : "test",
              password : "test"
          })

          console.log(response.body)

        
          expect(response.statusCode).toBe(200)
          expect(response.body.data.email).toBe("test")
          expect(response.body.data.token).toBeDefined()
      })

   
    })
    
  
})