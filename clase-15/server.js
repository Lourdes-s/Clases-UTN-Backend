import express from  'express';
import userRouter from './routes/users.routes.js';

const app = express()
const PORT = 3000


app.use(express.json())

app.get('/ping', (req, res) => {
    res.json({
        ok:  true,
        message: 'consulta existosa',
        status: 200,
        payload: {
            value: 'pong'
        }
    })
})

app.use('/api/users', userRouter)

app.listen (PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
    })
