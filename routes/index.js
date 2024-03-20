const router = require("express").Router()

//user types
router.use("/usertype", require("./userTypeRoute"))
//user
router.use("/user", require("./userRoute"))
module.exports = router