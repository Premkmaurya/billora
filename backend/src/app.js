const express = require("express")
const app = express()
const cookieParser = require("cookie-parser")

const authRoutes = require("./routes/authRoute")
const businessRoutes = require("./routes/businessRoute")

app.use(express.json())
app.use(cookieParser())

app.use("/api/auth", authRoutes)
app.use("/api/business", businessRoutes)

module.exports = app;