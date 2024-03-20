const express = require('express');
const app = express();
const cors = require('cors');
require("dotenv").config()
require("./models/index")
require("./models/tables")

//create a port number
const PORT = process.env.PORT || 8000
app.use(express.json())
app.use(cors())

app.use("/api", require("./routes/index"))

app.use("", (req, res) => {
    return res.status(404).json({ message: "Url not found" })
})
//create a server
app.listen(PORT, () => console.log(`${PORT} listening on port`))