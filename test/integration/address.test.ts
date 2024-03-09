import supertest from 'supertest'
import app from '../../src/utils/app'
import { knex } from '../../src/database'
import { createDummyAndAuthorize } from '../../src/utils/helpers'


const server = app.listen()

let usr: any

afterAll(async () => {
    await server.close()
})

describe('POST /api/v1/address', () => {

  beforeEach(async() => {
    return await knex.migrate.rollback()
    .then(async () => {return await knex.migrate.latest()})
    .then(async () => { usr = await createDummyAndAuthorize() })
  })

  afterEach(async () => {
    return await knex.migrate.rollback()
  })

  it('1. ADDRESS: Should return 200', async () => {

    const request = supertest(server)
    const res = await request
    .post(`/api/v1/address`)
    .set('Authorization', `jwt ${usr.accessToken}`)
    .expect(200)
    const info = res.body
    const status = res.status
  
    expect(info.userId).toMatch(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$/i)
      
    

  })
})
