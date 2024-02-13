import { connect } from "../../src/database"

test.skip('Database Postgres', async () => {
    
    const db = await connect()
       
    expect(db).not.toBeNull()
    expect(db).not.toBe(null)
    
})