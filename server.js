import express from "express";
import dotenv from 'dotenv'
import connectDB from "./config/db.js";
import authRoutes from './routes/authRoutes.js'
import noteRoutes from './routes/noteRoutes.js'
import cors from 'cors';
import { fileURLToPath } from 'url'
import path from "path";

dotenv.config();
const app = express();
connectDB();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.json());
app.use(express.static(path.join(__dirname, "./client/build")));


app.use(cors());
app.use('/api/v1/auth', authRoutes)
app.use('/api/v1/note', noteRoutes)

app.use("*", (req, res) => {
    res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

const port = process.env.PORT;

app.listen(port, () => {
    console.log(`server running on port ${port}`)
})

