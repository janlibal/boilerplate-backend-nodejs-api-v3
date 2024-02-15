import supertest from 'supertest'
import { knex } from '../../src/database'
import app from '../../src/utils/app'
import { testUser } from '../../src/utils/helpers'

const server = app.listen()

afterAll(async () => {
    await server.close()
})

let dummy: any

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
      name: testUser.name,
      email: testUser.email,
      password: testUser.password
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
    expect(info.data.email).toMatch(/^\S+@\S+\.\S+$/)
    expect(info.data.token).toMatch(/^[A-Za-z0-9-_=]+\.[A-Za-z0-9-_=]+\.?[A-Za-z0-9-_.+/=]*$/)
})
})

