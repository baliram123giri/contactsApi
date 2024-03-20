const { createUser, listUser, singleUser, updateUser, deleteUser } = require("../controllers/userController/userController")

const router = require("express").Router()

//user types
router.post("/create", createUser)
router.get("/list", listUser)
router.get("/single/:id", singleUser)
router.put("/update/:id", updateUser)
router.delete("/delete/:id", deleteUser)

module.exports = router