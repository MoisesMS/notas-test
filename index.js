const express = require("express")
const router = require("./routes")
const bodyParser = require("body-parser")

const app = express()

const port = process.env.PORT || 3000

app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())

app.use("/", router)
app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.listen(port, () => {
  console.log("Servidor escuchando en http://localhost:" + port)
})
