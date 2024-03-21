const { createWebsite, listWebsite, singleWebsite, updateWebsite, deleteWebsite } = require("../controllers/websiteController/websiteController")



const router = require("express").Router()

//user types
router.post("/create", createWebsite)
router.get("/list", listWebsite)
router.get("/single/:id", singleWebsite)
router.put("/update/:id", updateWebsite)
router.delete("/delete/:id", deleteWebsite)

module.exports = router