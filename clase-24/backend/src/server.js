import express from 'express'
import statusRouter from './routes/status.route.js'
import authRouter from './routes/auth.route.js'
import mongoDB from './config/db.config.js'
import cors from 'cors'

const PORT = 3000
const app = express()

//cors es un middleware que habilita las consultas de origen cruzadas
app.use(cors())
app.use(express.json())

app.use('/api/status', statusRouter)
app.use('/api/auth', authRouter)

app.listen(PORT, () => {
    console.log(`el servidor se esta ejecutando en http://localhost:${PORT}`)
})