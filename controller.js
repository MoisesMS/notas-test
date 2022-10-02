const mysql = require("mysql")

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "notas"
})

connection.connect((err) => {
  if(err) throw err
  else console.log("Base de datos conectada...")
})

const getNotes = (req, res) => {
  const sql = "SELECT * FROM notas"

  connection.query(sql, (err, result) => {
    if(err) throw err
    
    if(result.length > 0) {
      res.json(result)
    } else {
      res.send("Vacío...")
    }
  })
}

const getNotesForId = (req, res) => {
  const { id } = req.params

  const sql = "SELECT * FROM notas WHERE id = ?"

  connection.query(sql, [id], (err, result) => {
    if(err) throw err
    
    if(result.length > 0) {
      res.json(result)
    } else {
      res.send("Vacío...")
    }
  })
}

//BUG Los datos se guardan pero el cliente no envía respuesta
const insertNote = (req, res) => {
  const titulo = req.body.titulo
  const descripcion = req.body.descripcion

  const sql = "INSERT INTO notas (id, titulo, descripcion, completado) VALUES('', ?, ?, 0)"

  console.log(titulo)
  console.log(descripcion)

  connection.query(sql, [titulo, descripcion], (err, result) => {
    if(err) throw err
  })
}

//BUG El recurso se elimina pero el cliente no envía una respuesta
const deleteNote = (req, res) => {
  const id = req.body.id

  const sql = "DELETE FROM notas WHERE id = ?"

  connection.query(sql, [id], (err, result) => {
    if(err) throw err
  })
}


module.exports = { getNotes, getNotesForId, insertNote, deleteNote }
