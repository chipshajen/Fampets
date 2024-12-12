const indexQueries = require('../db/queries/index')

const getCounts = async(req, res) => {
    const stats = await indexQueries.getAllCounts()
    console.log(stats)
    res.render('index', {stats: stats})
}

module.exports = {
    getCounts
}