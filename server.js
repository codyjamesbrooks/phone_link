const path = require("path");
const express = require("express");
const webpack = require("webpack")
const webpackMiddleware = require("webpack-dev-middleware");
const webpackConfig = require("./webpack.config")

const app = express()
const publicPath = path.join(__dirname, "public");
const port = process.env.PORT || 9000

app.use(express.static(publicPath))
app.use(webpackMiddleware(webpack(webpackConfig)))
app.use(express.json())
app.use(express.urlencoded())

app.get('/result', (req, res) => {
  res.sendFile(path.join(__dirname + '/public/result.html'))
})


app.listen(port, () => {
  console.log(`Listening on port ${port}`)
})