import supertest from 'supertest'
import app from '../../src/utils/app'


const server = app.listen()

const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJkZDU0M2E0YS05ZTkwLTQ1MjAtYTljNS1mMTE2YjgyMTgxOTIiLCJpYXQiOjE3MDk4MTk1MjIsImV4cCI6MTcwOTgyOTUyMiwiaXNzIjoiQ09NLkpBTkxJQkFMLmRldmVsb3BtZW50In0.12jmcKAa20PgC_l4DMYRGBdO8lzbWL1cj2xTvp7lhOk'

afterAll(async () => {
    await server.close()
})

describe('POST /api/v1/address', () => {

    it('1. ADDRESS: Should return 200', async () => {
      const request = supertest(server)
      const res = await request
      .post(`/api/v1/address`)
      .set('Authorization', `jwt ${token}`)
      .expect(200)

      const info = res.body
      const status = res.status
      
      expect(info.userId).toMatch(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$/i)
    

  })
})
