import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import user_details from './routes/userdetails.routes.js'
import evidence_routes from './routes/evidence.routes.js'
import guidelines_routes from './routes/guidelines.routes.js'
import locations_routes from './routes/locations.routes.js'
import weather_routes from './routes/weather.routes.js'
import appeal_routes from './routes/appeal.routes.js'
import reviewer_routes from './routes/reviewer.routes.js'


const app = express()
const port = 3000

dotenv.config();

const allowedOrigins = (process.env.CORS_ORIGIN || 'http://localhost:5173')
    .split(',')
    .map((origin) => origin.trim())
    .filter(Boolean);

app.use(cors({
    origin: allowedOrigins,
    credentials: true
}))
app.use(express.json())

app.use(user_details)
app.use(evidence_routes)
app.use(guidelines_routes)
app.use(locations_routes)
app.use(weather_routes)
app.use(appeal_routes)
app.use(reviewer_routes)
app.listen(port, () => console.log(`Example app listening on port ${port}!`))