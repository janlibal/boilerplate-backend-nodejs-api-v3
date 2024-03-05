import { close, connect } from "../../src/database"

/*test.skip('Database Postgres', async () => {
    
    const db = await connect()
       
    expect(db).not.toBeNull()
    expect(db).not.toBe(null)

    close()
    
})*/


describe('Postgres DB Connection', () => {
    it.only('should establish a successful DB connection', async () => {
     
      // Attempt to connect to the database
      const db = await connect()
  
      // Verify the connection
      expect(db).toBeTruthy()
  
      // Release the client
      close()
    })
  })