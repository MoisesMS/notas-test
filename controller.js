const mysql = require("mysql")
require("dotenv").config()


const connection = mysql.createConnection({
  host: process.env.HOST,
  user: process.env.USERNAME,
  password: process.env.PASS,
  database: process.env.DDBB
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

const insertNote = (req, res) => {

  
  const titulo = req.body.titulo
  const descripcion = req.body.descripcion
  
  if(!(titulo && descripcion)) {
    return res.status(400).json({
      message: "Datos insuficientes. Falta título y/o descripción",
      status: 400
    })
  } else {
    const sql = "INSERT INTO notas (id, titulo, descripcion, completado) VALUES('', ?, ?, 0)"
  
    connection.query(sql, [titulo, descripcion], (err, result) => {
      if(err) {
        return res.status(500).json({
          message: "Error al crear la nota",
          status: 500
        })
      } else {
        return res.status(201).json({
          message: "Nota creada",
          status: 201
        })
      }
    })
  }
}

const deleteNote = (req, res) => {
  const id = req.body.id

  if(!id) {
    return res.status(400).json({
      message: "Falta el identificador",
      status: 400
    }) 
  } else {
    const sql = "DELETE FROM notas WHERE id = ?"
  
    connection.query(sql, [id], (err, result) => {
      if(err) {
        return res.status(500).json({
          message: "Error. No se ha podido eliminar la nota",
          status: 500
        })
      } else {
        return res.status(204).json({
          message: "Nota eliminada con éxito",
          status: 204
        })
      }


    })
  }

}


module.exports = { getNotes, getNotesForId, insertNote, deleteNote }
