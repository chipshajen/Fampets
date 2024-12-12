const express = require('express');
const app = express()
const path = require('path')

const assetsPath = path.join(__dirname, "public");
app.use(express.static(assetsPath));

app.set('view engine', 'ejs')

const categories = [
    { href: '/family', text: 'Family' },
    { href: '/species', text: 'Species' },
    { href: '/breed', text: 'Breed' },
    { href: '/color', text: 'Color' },
    { href: '/pet', text: 'Pet' },
]

app.use('/', (req, res) => {
    res.render('index', {categories: categories})
})

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log(`Listening to port ${PORT}, server is up!`)
})