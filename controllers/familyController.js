const familyQueries = require('../db/queries/family')

const getAllFamilies = async(req, res) => {
    const data = await familyQueries.getAllFamilies()
    console.log(data)
    res.render('family', {families: data})
}

const getFamily = async(req, res) => {
    const { familyId } = req.params
    const data = await familyQueries.getFamily(familyId)
    res.render('family', {families: null, family: data})
}

module.exports = {
    getAllFamilies,
    getFamily
}