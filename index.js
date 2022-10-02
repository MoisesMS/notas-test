const express = require("express")
const router = require("./routes")

const app = express()

const port = process.env.PORT || 3000

app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use("/", router)
app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.listen(port, () => {
  console.log("Servidor escuchando en http://localhost:" + port)
})
