import { INestApplication } from "@nestjs/common"
import { TestService } from "./test.service"
import { AppModule } from "../src/app.module"
import { Test, TestingModule } from "@nestjs/testing"
import { TestModule } from "./test.module"
import * as request from "supertest"
import exp from "constants"

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
        
          expect(response.statusCode).toBe(200)
          expect(response.body.data.email).toBe("test")
          expect(response.body.data.token).toBeDefined()
      })
    })

    describe('/GET /api/user/me', () => {
        beforeEach(async () => {
            await testService.deleteAll()
            await testService.createDataUser()
        })

        it('should get user profile', async () => {
            const response = await request(app.getHttpServer()).get('/api/user/me').set('authorization', `Bearer ${"test"}`).send({})
            expect(response.statusCode).toBe(200)
            expect(response.body.data.username).toBe("test")
            expect(response.body.data.email).toBe("test")
        })
    })
    

    describe('/POST /api/user/logout', () => {
      beforeEach(async () => {
          await testService.deleteAll()
          await testService.createDataUser()
      })

      it('should logout user', async () => {
          let testUser = await testService.getUser()
          const response = await request(app.getHttpServer()).delete('/api/user/logout').set('authorization', `Bearer ${"test"}`).send({})
          expect(response.statusCode).toBe(200)

          testUser = await testService.getUser()
          expect(testUser.token).toBeNull()
      })
    })
    
})