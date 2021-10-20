const path = require("path");
const express = require("express");
const webpack = require("webpack");
const webpackMiddleware = require("webpack-dev-middleware");
const webpackConfig = require("./webpack.config");

const app = express()
const distPath = path.join(__dirname, "dist");
const port = process.env.PORT || 5000

app.use(express.static(distPath))
app.use(webpackMiddleware(webpack(webpackConfig)))

app.listen(port, () => {
  console.log(`listening on port ${port}`)
})