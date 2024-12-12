const pool = require('../pool')

async function getAllCounts(){
    const { rows } = await pool.query(`
        SELECT 
      (SELECT COUNT(*) FROM family) AS family_count,
      (SELECT COUNT(*) FROM pet) AS pets_count
    `)
    console.log(rows[0])
    return rows
}

getAllCounts()