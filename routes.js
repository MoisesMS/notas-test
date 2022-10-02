const express = require("express")
const controller = require("./controller")

const router = express.Router()

router.get("/api/", controller.getNotes)
router.get("/api/:id", controller.getNotesForId)
router.post("/api/upload/", controller.insertNote)
router.delete("/api/", controller.deleteNote)

module.exports = router
