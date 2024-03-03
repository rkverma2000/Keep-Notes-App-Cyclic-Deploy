import express from "express";
import dotenv from 'dotenv'
import connectDB from "./config/db.js";
import authRoutes from './routes/authRoutes.js'
import noteRoutes from './routes/noteRoutes.js'
import cors from 'cors';

dotenv.config()
const app = express()
connectDB();

app.use(express.json())

app.use(cors());
app.use('/api/v1/auth', authRoutes)
app.use('/api/v1/note', noteRoutes)

app.get('/', (req, res) => {
    res.send("Keep Notes app")
})



const port = process.env.PORT;

app.listen(port, () => {
    console.log(`server running on port ${port}`)
})

