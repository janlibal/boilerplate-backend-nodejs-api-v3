import supertest from 'supertest'
import app from '../../src/utils/app'

const server = app.listen()

afterAll(async () => {
    await server.close()
})


describe('POST /api/v1/address', () => {

    it.only('1. ADDRESS: Should return 200', async () => {
      const request = supertest(server)
      const res = await request
      .post(`/api/v1/address`)
      .expect(200)

      const info = res.body
      const status = res.status
      expect(status).toBe(200)
      expect(info.userId).toMatch(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$/i)
      
  



  })
})