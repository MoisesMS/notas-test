const express = require("express")
const path = require("path")
const router = require("./routes/routes")


const app = express()

const port = process.env.PORT || 3000

app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use("/", router)

app.use((req, res, next) => {
  res.status(404).sendFile(path.resolve(__dirname, "./public/404.html"))
})

app.use(express.urlencoded({extended:true}))
app.use(express.json())

app.listen(port, () => {
  console.log("Servidor escuchando en http://localhost:" + port)
})
