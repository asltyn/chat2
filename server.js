const { validate } = require("@babel/types")
const express = require("express")
const path = require("path")
const logger = require("./middlewares/logger.js")
const validator = require("./middlewares/validator.js")
const usersDataPath = "./database/users.json"
const fs = require("fs")
const timeout = require("./middlewares/timeout.js")

const port = 8080
const app = express()

//const __dirname = path.resolve()
const rawdata = fs.readFileSync(usersDataPath)
const users = JSON.parse(rawdata)
console.log(users)
//app.use(express.static(path.resolve(__dirname, "public")))
app.use(express.json())
app.post("/AUTH", logger, timeout, (req, res) => {
  const { name, password } = { ...req.body }
  const find = users.find((user) => user.name === name && user.pwd === password)
  res.json(find ? "user find" : "user not find")
})

app.listen(port, () => console.log(`server has been started on port ${port}...`))
