import "dotenv/config"
import express from 'express'
import allRoutes from "./routes/allRoutes.js"
import { connectDB } from "./db/config.js"
import syncDb from "./db/init.js"
import cleanupExpiredToken from "./utils/tokenCleanup.js"




const app = express()

app.use(express.json())

app.use(allRoutes)

connectDB()
syncDb()

const startTokenCleanup = () => {
    cleanupExpiredToken();
    setInterval(cleanupExpiredToken, 10 * 60 * 1000)
}

startTokenCleanup()

app.listen(3001, () => {
    console.log("server started")
})