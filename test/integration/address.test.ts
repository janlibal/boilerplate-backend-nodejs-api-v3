import supertest from 'supertest'
import app from '../../src/utils/app'

const server = app.listen()

afterAll(async () => {
    await server.close()
})


describe('POST /api/v1/address', () => {

    it('1. ADDRESS: Should return 200', async () => {
      const request = supertest(server)
      const res = await request
      .post(`/api/v1/address`)
      .expect('Content-Type', /json/)
      .expect(200)
  })
})