const pool = require('../pool')

async function getAllPets() {
    const { rows } = await pool.query("SELECT * FROM pet")
    console.log(rows)
    return rows
}

module.exports = {
    getAllPets
}