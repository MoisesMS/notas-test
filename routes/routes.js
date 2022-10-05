const express = require("express")
const path = require("path")
const controller = require("../controllers/controller")


const router = express.Router()

router.get("/", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../public/index.html"))
})

router.get("/api/", controller.getNotes)
router.get("/api/:id", controller.getNotesForId)
router.post("/api/upload/", controller.insertNote)
router.patch("/api/", controller.updateNote)
router.delete("/api/", controller.deleteNote)

module.exports = router
