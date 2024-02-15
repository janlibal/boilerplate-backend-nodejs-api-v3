import supertest from 'supertest'
import { knex } from '../../src/database'
import app from '../../src/utils/app'

const server = app.listen()

afterAll(async () => {
    await server.close()
})


describe('POST /api/v1/user', () => {
    
  beforeEach(async() => {
      return await knex.migrate.rollback()
      .then(async () => {return await knex.migrate.latest()})
    })
  
    afterEach(async () => {
      return await knex.migrate.rollback()
    })
  
    it('Should register user', async () => {
      const request = supertest(server)
      const res = await request
      .post(`/api/v1/user`)
      .expect('Content-Type', /json/)
      .expect(200)
  })
})

