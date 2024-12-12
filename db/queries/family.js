const pool = require('../pool')

async function getAllFamilies() {
    const { rows } = await pool.query("SELECT * FROM family")
    console.log(rows)
    return rows
}

module.exports = {
    getAllFamilies
}