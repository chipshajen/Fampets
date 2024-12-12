const pool = require('../pool')

async function getAllCounts() {
    const { rows } = await pool.query(`
        SELECT 
      (SELECT COUNT(*) FROM family) AS family_count,
      (SELECT COUNT(*) FROM pet) AS pet_count
    `)
    return rows[0]
}

module.exports = {
    getAllCounts
}