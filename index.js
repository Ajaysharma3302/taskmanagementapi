const express = require("express");
const app= express();
const dotenv = require("dotenv").config()
const connection = require("./config/db");
const taskRoutes = require("./routes/taskroute")
const userRoutes = require("./routes/userroute")
const PORT = process.env.PORT || 6433
app.use(express.json())

app.use("/tasks",taskRoutes);
app.use("./users",userRoutes)



app.listen(PORT,async()=>{
    try {
        await connection
        console.log(`connected to server on PORT no:${PORT} and database`)
    } catch (error) {
        console.error(`${error}`)
    }
})

module.exports = app;