const pool = require('./pool')

async function test() {
    const { rows } = await pool.query("SELECT * FROM pet")
    console.log(rows)
}

test()