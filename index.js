
//Terminado
const express = require('express')
const mongoose = require("mongoose")
require('dotenv').config()
const userRouter = require('./src/routes/userRouter')
const cors = require('cors')

const app = express()

app.use(express.json())
app.use(cors())

const PORT = process.env.PORT  || 3000 

const mongoUrl = process.env.DATA_URL_MONGO

mongoose.connect(mongoUrl)

const db = mongoose.connection

db.on("error", (error) => {
  console.log("Mongo connection error.");
})

db.on("connected", () => {
  console.log("Success connection");
})

db.on("disconnected", () => {
  console.log("Mongo is disconnected.");
})


app.use('/', userRouter)

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
})