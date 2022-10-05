const mysql = require("mysql")
const path = require("path")
require("dotenv").config()


const connection = mysql.createConnection({
  host: process.env.HOST,
  user: process.env.USERNAME,
  password: process.env.PASS,
  database: process.env.DDBB
})

connection.connect((err) => {
  if(err){
    console.log("Error. La base de datos no se ha podido conectar")
  } else console.log("Base de datos conectada...")
})

const getNotes = (req, res) => {
  const sql = "SELECT * FROM notas"

  connection.query(sql, (err, result) => {
    if(err) {
      console.log("Error. No se ha podido conseguir los datos")
    }
    
    if(result.length > 0) {
      res.json(result)
    } else {
      res.sendFile(path.resolve(__dirname, "../public/notas.html"))
    }
  })
}

const getNotesForId = (req, res) => {
  const { id } = req.params

  const sql = "SELECT * FROM notas WHERE id = ?"

  connection.query(sql, [id], (err, result) => {
    if(err) {
      console.log("Error. No se ha podido conseguir los datos")
    }
    
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

const updateNote = (req, res) => {
  const id = req.body.id
  const titulo = req.body.titulo
  const descripcion = req.body.descripcion

  if(!id && !titulo && !descripcion) {
    return res.status(400).json({
      message: "Faltan datos",
      status: 400
    })
  } else {
    const sql = "UPDATE notas SET titulo = ?, descripcion = ? WHERE id = ?"

    connection.query(sql, [titulo, descripcion, id], (err, result) => {
      if(err) {
        return res.status(500).json({
          message: "Error. No se ha podido actualizar la nota",
          status: 500
        })
      } return res.status(204).json({
        message: "Nota actualizada con éxito",
        status: 204
      })
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


module.exports = { getNotes, getNotesForId, insertNote, deleteNote, updateNote }
