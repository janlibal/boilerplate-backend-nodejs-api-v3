import supertest from 'supertest'
import { knex } from '../../src/database'
import app from '../../src/utils/app'
import { createDummy, testUser } from '../../src/utils/helpers'

const server = app.listen()

afterAll(async () => {
    await server.close()
})

let dummy: any



describe('POST /api/v1/login', () => {
    
  beforeEach(async() => {
      return await knex.migrate.rollback()
      .then(async () => {return await knex.migrate.latest()})
      .then(async () => { dummy = await createDummy() })
    })
  
    afterEach(async () => {
      return await knex.migrate.rollback()
    })
  
    it('1. LOGIN: Should login user', async () => {
        const request = supertest(server)
        const userData = {
          email: await dummy.email, 
          password: 'Password123!'
        }
        const res = await request
        .post(`/api/v1/login`)
        .send(userData)
        .expect('Content-Type', /json/)
        .expect(200)

        const info = res.body
        const status = res.status
        //const expected = ['status', 'data']
        //expect(Object.keys(info)).toEqual(expect.arrayContaining(expected))
        expect(status).toBe(200)
        expect(info.email).toMatch(/^\S+@\S+\.\S+$/)
        expect(info.token).toMatch(/^[A-Za-z0-9-_=]+\.[A-Za-z0-9-_=]+\.?[A-Za-z0-9-_.+/=]*$/)
    })

    it('2. LOGIN: returns 401 for wrong username', async () => {
      const request = supertest(server)
      const userData = {
        email: 'unknownuser@domain.com', //await dummy.email, 
        password: 'Password123!'
      }
      const res = await request
      .post(`/api/v1/login`)
      .send(userData)
      .expect('Content-Type', /json/)
      .expect(401)

      const info = res.body
      const status = res.status
      //const expected = ['status', 'data']
      //expect(Object.keys(info)).toEqual(expect.arrayContaining(expected))
      expect(status).toBe(401)
      expect(info.status).toBe(401)
      expect(info.requestId).toMatch(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$/i)
      expect(info.type).toMatch('UNAUTHORIZED')
      expect(info.message).toMatch('Invalid email or password')
      expect(info.stack).toMatch(/UnauthorizedError: Invalid email or password/i)
      
  })

  it('3. LOGIN: returns 401 for wrong password', async () => {
    const request = supertest(server)
    const userData = {
      email: 'jan.libal@libaldesign.com', //await dummy.email, 
      password: 'abcdefgh130!'
    }
    const res = await request
    .post(`/api/v1/login`)
    .send(userData)
    .expect('Content-Type', /json/)
    .expect(401)

    const info = res.body
    const status = res.status
    //const expected = ['status', 'data']
    //expect(Object.keys(info)).toEqual(expect.arrayContaining(expected))
    expect(status).toBe(401)
    expect(info.status).toBe(401)
    expect(info.requestId).toMatch(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$/i)
    expect(info.type).toMatch('UNAUTHORIZED')
    expect(info.message).toMatch('Invalid email or password')
    expect(info.stack).toMatch(/UnauthorizedError: Invalid email or password/i)
    
  })

  it('4. LOGIN: returns 400 for wrong email format', async () => {
    const request = supertest(server)
    const userData = {
      email: 'joedoedomain.com', 
      password: 'Password123!'
    }
    const res = await request
    .post(`/api/v1/login`)
    .send(userData)
    .expect('Content-Type', /json/)
    .expect(400)

    const info = res.body
    const status = res.status
    //const expected = ['status', 'data']
    //expect(Object.keys(info)).toEqual(expect.arrayContaining(expected))
    
    expect(status).toBe(400)
    expect(info.status).toBe(400)
    expect(info.requestId).toMatch(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$/i)
    expect(info.type).toMatch('INVALID_BODY_FORMAT')
    expect(info.message).toMatch('instance.email does not conform to the \"email\" format')
    expect(info.stack).toMatch(/InvalidRequestBodyFormat: instance.email does not conform to the \"email\" format/i)
    
  })


  it('5. LOGIN: returns 400 for password being too short', async () => {
    const request = supertest(server)
    const userData = {
      email: 'jan.libal@libaldesign.com', //await dummy.email, 
      password: 'Pass'
    }
    const res = await request
    .post(`/api/v1/login`)
    .send(userData)
    .expect('Content-Type', /json/)
    .expect(400)

    const info = res.body
    const status = res.status
    //const expected = ['status', 'data']
    //expect(Object.keys(info)).toEqual(expect.arrayContaining(expected))
    
    expect(status).toBe(400)
    expect(info.status).toBe(400)
    expect(info.requestId).toMatch(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$/i)
    expect(info.type).toMatch('INVALID_BODY_FORMAT')
    expect(info.message).toMatch('instance.password does not meet minimum length of 8')
    expect(info.stack).toMatch(/InvalidRequestBodyFormat: instance.password does not meet minimum length of 8/i)
    
  })

})




  describe('POST /api/v1/user', () => {
    
  beforeEach(async() => {
    return await knex.migrate.rollback()
    .then(async () => {return await knex.migrate.latest()})
  })

  afterEach(async () => {
    return await knex.migrate.rollback()
  })
  
  it('6. REGISTER: Should register user', async () => {
    const request = supertest(server)
    const userData = {
      name: 'Jan Libal', //testUser.name,
      email: 'jan.libal@libaldesign.com', //testUser.email,
      password: 'Password.123!' //testUser.password
    }
    const res = await request
    .post(`/api/v1/user`)
    .send(userData)
    .expect('Content-Type', /json/)
    .expect(201)

    const info = res.body
    const status = res.status
    //const expected = ['status', 'data']
    //expect(Object.keys(info)).toEqual(expect.arrayContaining(expected))
    expect(status).toBe(201)
    expect(info.email).toMatch(/^\S+@\S+\.\S+$/)
    expect(info.token).toMatch(/^[A-Za-z0-9-_=]+\.[A-Za-z0-9-_=]+\.?[A-Za-z0-9-_.+/=]*$/)
  })


  it('7. REGISTER: returns 400 for missing name', async () => {
    const request = supertest(server)
    const userData = {
      //name: testUser.name,
      email: 'jan.libal@libaldesign.com', //testUser.email,
      password: 'Password.123!' //testUser.password
    }
    const res = await request
    .post(`/api/v1/user`)
    .send(userData)
    .expect('Content-Type', /json/)
    .expect(400)

    const info = res.body
    const status = res.status
    //const expected = ['status', 'data']
    //expect(Object.keys(info)).toEqual(expect.arrayContaining(expected))
    expect(status).toBe(400)
    expect(info.status).toBe(400)
    expect(info.requestId).toMatch(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$/i)
    expect(info.type).toMatch('INVALID_BODY_FORMAT')
    expect(info.message).toMatch('instance.name is required')
    expect(info.stack).toMatch(/InvalidRequestBodyFormat: instance.name is required/i)
  })


  it('8. REGISTER: returns 400 for missing email', async () => {
    const request = supertest(server)
    const userData = {
      name: 'Jan Libal', //testUser.name,
      //email: testUser.email,
      password: 'Passowrd.123!' //testUser.password
    }
    const res = await request
    .post(`/api/v1/user`)
    .send(userData)
    .expect('Content-Type', /json/)
    .expect(400)

    const info = res.body
    const status = res.status
    //const expected = ['status', 'data']
    //expect(Object.keys(info)).toEqual(expect.arrayContaining(expected))
    expect(status).toBe(400)
    expect(info.status).toBe(400)
    expect(info.requestId).toMatch(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$/i)
    expect(info.type).toMatch('INVALID_BODY_FORMAT')
    expect(info.message).toMatch('instance.email is required')
    expect(info.stack).toMatch(/InvalidRequestBodyFormat: instance.email is required/i)
  })


  it('9. REGISTER: returns 400 for missing password', async () => {
    const request = supertest(server)
    const userData = {
      name: 'Jan Libal', //testUser.name,
      email: 'jan.libal@libaldesign.com' //testUser.email,
      //password: testUser.password
    }
    const res = await request
    .post(`/api/v1/user`)
    .send(userData)
    .expect('Content-Type', /json/)
    .expect(400)

    const info = res.body
    const status = res.status
    //const expected = ['status', 'data']
    //expect(Object.keys(info)).toEqual(expect.arrayContaining(expected))
    expect(status).toBe(400)
    expect(info.status).toBe(400)
    expect(info.requestId).toMatch(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$/i)
    expect(info.type).toMatch('INVALID_BODY_FORMAT')
    expect(info.message).toMatch('instance.password is required')
    expect(info.stack).toMatch(/InvalidRequestBodyFormat: instance.password is required/i)
  })


  it('10. REGISTER: returns 400 for missing name and email', async () => {
    const request = supertest(server)
    const userData = {
      //name: testUser.name,
      //email: testUser.email,
      password: 'Password.123!' //testUser.password
    }
    const res = await request
    .post(`/api/v1/user`)
    .send(userData)
    .expect('Content-Type', /json/)
    .expect(400)

    const info = res.body
    const status = res.status
    //const expected = ['status', 'data']
    //expect(Object.keys(info)).toEqual(expect.arrayContaining(expected))
    expect(status).toBe(400)
    expect(info.status).toBe(400)
    expect(info.requestId).toMatch(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$/i)
    expect(info.type).toMatch('INVALID_BODY_FORMAT')
    expect(info.message).toMatch('instance.name is required,instance.email is required')
    expect(info.stack).toMatch(/InvalidRequestBodyFormat: instance.name is required,instance.email is required/i)
  })

  it('11. REGISTER: returns 400 for missing name and password', async () => {
    const request = supertest(server)
    const userData = {
      //name: testUser.name,
      email: 'jan.libal@libaldesign.com' //testUser.email,
      //password: testUser.password
    }
    const res = await request
    .post(`/api/v1/user`)
    .send(userData)
    .expect('Content-Type', /json/)
    .expect(400)

    const info = res.body
    const status = res.status
    //const expected = ['status', 'data']
    //expect(Object.keys(info)).toEqual(expect.arrayContaining(expected))
    expect(status).toBe(400)
    expect(info.status).toBe(400)
    expect(info.requestId).toMatch(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$/i)
    expect(info.type).toMatch('INVALID_BODY_FORMAT')
    expect(info.message).toMatch('instance.name is required,instance.password is required')
    expect(info.stack).toMatch(/InvalidRequestBodyFormat: instance.name is required,instance.password is required/i)
    
  })


  it('12. REGISTER: returns 400 for missing email and password', async () => {
    const request = supertest(server)
    const userData = {
      name: 'Jan Libal', //testUser.name,
      //email: 'jan.libal@libaldesign.com' //testUser.email,
      //password: testUser.password
    }
    const res = await request
    .post(`/api/v1/user`)
    .send(userData)
    .expect('Content-Type', /json/)
    .expect(400)

    const info = res.body
    const status = res.status
    //const expected = ['status', 'data']
    //expect(Object.keys(info)).toEqual(expect.arrayContaining(expected))
    expect(status).toBe(400)
    expect(info.status).toBe(400)
    expect(info.requestId).toMatch(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$/i)
    expect(info.type).toMatch('INVALID_BODY_FORMAT')
    expect(info.message).toMatch('instance.email is required,instance.password is required')
    expect(info.stack).toMatch(/InvalidRequestBodyFormat: instance.email is required,instance.password is required/i)
    
  })

  it('13. REGISTER: returns 400 for missing email and name', async () => {
    const request = supertest(server)
    const userData = {
      //name: testUser.name,
      //email: 'jan.libal@libaldesign.com' //testUser.email,
      password: testUser.password
    }
    const res = await request
    .post(`/api/v1/user`)
    .send(userData)
    .expect('Content-Type', /json/)
    .expect(400)

    const info = res.body
    const status = res.status
    //const expected = ['status', 'data']
    //expect(Object.keys(info)).toEqual(expect.arrayContaining(expected))
    expect(status).toBe(400)
    expect(info.status).toBe(400)
    expect(info.requestId).toMatch(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$/i)
    expect(info.type).toMatch('INVALID_BODY_FORMAT')
    expect(info.message).toMatch('instance.name is required,instance.email is required')
    expect(info.stack).toMatch(/InvalidRequestBodyFormat: instance.name is required,instance.email is required/i)
    
  })



  it('REGISTER: User already exists', async () => {
    const request = supertest(server)
    const userData = {
      name: 'Jan Libal',
      email: 'jan.libal@libaldesign.com', //testUser.email,
      password: testUser.password
    }

    const createUser = await request
    .post(`/api/v1/user`)
    .send(userData)
    /*.expect('Content-Type', /json/)
    .expect(200)*/

    const res = await request
    .post(`/api/v1/user`)
    .send(userData)
    .expect('Content-Type', /json/)
    .expect(409)

    const info = res.body
    const status = res.status
    //const expected = ['status', 'data']
    //expect(Object.keys(info)).toEqual(expect.arrayContaining(expected))
    expect(status).toBe(409)
    expect(info.status).toBe(409)
    expect(info.requestId).toMatch(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$/i)
    expect(info.type).toMatch('RESOURCE_ALREADY_EXISTS')
    expect(info.message).toMatch('User already registered')
    expect(info.stack).toMatch(/ResourceAlreadyExists: User already registered/i)
    
    
  })


})
