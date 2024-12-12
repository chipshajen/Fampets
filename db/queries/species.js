const pool = require('../pool')

async function getAllSpecies() {
    const { rows } = await pool.query("SELECT * FROM species")
    console.log(rows)
    return rows
}

module.exports = {
    getAllSpecies
}