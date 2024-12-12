const pool = require('../pool')
const { getAllSpecies } = require('./species')

async function getAllColors() {
    const { rows } = await pool.query("SELECT * FROM color")
    console.log(rows)
    return rows
}

module.exports = {
    getAllColors
}