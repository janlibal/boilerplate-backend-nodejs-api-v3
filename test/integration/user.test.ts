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
      const userData = {
        name:  'Fake name',
        email: 'fake@email.com',
        password: 'Fake password'
      }
      const res = await request
      .post(`/api/v1/user`)
      .send(userData)
      .expect('Content-Type', /json/)
      .expect(200)
      const info = res.body
      const expected = ['status', 'data']
      expect(Object.keys(info)).toEqual(expect.arrayContaining(expected))
      expect(info.status).toBe('success')
      expect(info.data.user.id).toMatch(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$/i)
      expect(info.data.user.email).toMatch(/^\S+@\S+\.\S+$/)
      expect(info.data.token).toMatch(/^[A-Za-z0-9-_=]+\.[A-Za-z0-9-_=]+\.?[A-Za-z0-9-_.+/=]*$/)
  })
})

