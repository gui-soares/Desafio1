const express = require('express')
const nunjucks = require('nunjucks')

const app = express()

nunjucks.configure('views', {
  autoescape: true,
  express: app,
  watch: true
})

app.set('view engine', 'njk')
app.use(express.urlencoded({ extended: false }))

const queryVerify = (req, res, next) => {
  const viewAge = req.query.age
  if (!viewAge) {
    return res.redirect('/')
  }
  return next()
}

app.get('/', (req, res) => {
  return res.render('age')
})

app.post('/check', (req, res) => {
  const age = req.body.age
  if (age >= 18) {
    return res.redirect(`/major?age=${age}`)
  }
  return res.redirect(`/minor?age=${age}`)
})

app.get('/major', queryVerify, (req, res) => {
  const viewAge = req.query.age
  return res.render('major', { viewAge })
})

app.get('/minor', queryVerify, (req, res) => {
  const viewAge = req.query.age
  return res.render('minor', { viewAge })
})

app.listen(3000)
