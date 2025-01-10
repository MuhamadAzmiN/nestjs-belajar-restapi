import { INestApplication } from "@nestjs/common"
import { TestService } from "./test.service"
import { AppModule } from "../src/app.module"
import { Test, TestingModule } from "@nestjs/testing"
import { TestModule } from "./test.module"
import * as request from "supertest"
import { response } from "express"
import { retry } from "rxjs"
import { get } from "http"
import exp from "constants"

describe('Siswa Controller', () => {
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


  describe('POST /api/siswa', () => {
    afterEach(async () => {
      await testService.deleteAllDataSiswa()
    })
    it('should create a new siswa', async () => {
        const result = await request(app.getHttpServer()).post('/api/siswa').send(
          {
            nama : "test",
            nis : 12341,
            alamat : "test",
            jurusan : "pplg",
            rayon : "rayon 1"
          }
        )

        console.log(result.body)

  
        expect(result.statusCode).toBe(201)
        expect(result.body.data.nis).toBe(12341)
    })
  })



  describe('GET /api/siswa', () => {
    it('should get all siswa', async () => {
      const response = await request(app.getHttpServer()).get('/api/siswa').send({});
      expect(response.statusCode).toBe(200)
    })

  })


  describe('GET /api/siswa/:id ', () => {
    beforeEach(async () => {
      await testService.createDataSiswa()
    })


    afterEach(async () => {
      await testService.deleteAllDataSiswa()
    })
    it('should get data by id', async () => {
      const siswa = await testService.getUser()
      const response = await request(app.getHttpServer()).get(`/api/siswa/${siswa.id}`).send({});
      expect(response.statusCode).toBe(200)
    })
  })


  describe('DELETE /api/siswa/:id', () => {
    beforeEach(async () => {
      await testService.createDataSiswa()
    })

    afterEach(async () => {
      await testService.deleteAllDataSiswa()
    })
    it('should delete data by id', async () => {
      let siswa = await testService.getUser()
      const response = await request(app.getHttpServer()).delete(`/api/siswa/${siswa.id}`).send({});
      expect(response.statusCode).toBe(200)

      siswa = await testService.getUser()
      expect(siswa).toBe(null)
      
    })
  })


  describe('PUT /api/siswa/:id', () => {

    beforeEach(async () => {
      await testService.createDataSiswa()
    })
    afterEach(async () => {
      await testService.deleteAllDataSiswa()
    })

    it('should update data by id', async () => {
      let siswa = await testService.getUser()
      const response = await request(app.getHttpServer()).put(`/api/siswa/update/${siswa.id}`).send({
        nama : "test2",
        nis : 12341,
        jurusan : "pplg",
        rayon : "rayon 1"
      })
      console.log(response.body)

      expect(response.statusCode).toBe(200)
      expect(response.body.data.nis).toBe(12341)
      expect(response.body.data.nama).toBe("test2")
      expect(response.body.data.rayon).toBe("rayon 1")
      expect(response.body.data.jurusan).toBe("pplg")
    })
  })
  
  
  

})
