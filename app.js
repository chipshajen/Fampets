const express = require('express');
const app = express()
const path = require('path')
const categories = require('./config')
const indexRouter = require('./routes/indexRouter')
const familyRouter = require('./routes/familyRouter')

const assetsPath = path.join(__dirname, "public");
app.use(express.static(assetsPath));

app.set('view engine', 'ejs')



app.use((req, res, next) => {
    res.locals.categories = categories
    next()
})

app.use('/', indexRouter)
app.use('/family', familyRouter)

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log(`Listening to port ${PORT}, server is up!`)
})