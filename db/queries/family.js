const pool = require('../pool')

async function getAllFamilies() {
    const { rows } = await pool.query("SELECT * FROM family")
    return rows
}

async function getFamily(id){
    const SQL = `
        SELECT p.id, p.name, p.description, b.name AS breed, c.name AS color 
        FROM pet p
        JOIN breed b ON b.id = p.breedId
        JOIN color c ON c.id = p.colorId
        WHERE familyId = ($1)
    `
    const { rows } = await pool.query(SQL, [id])
    console.log(rows)
    return rows
}

module.exports = {
    getAllFamilies,
    getFamily
}

