const pool = require('../pool')

async function getAllBreeds() {
    const { rows } = await pool.query("SELECT * FROM breed")
    console.log(rows)
    return rows
}

module.exports = {
    getAllBreeds
}