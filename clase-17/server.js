import express from  'express';
import userRouter from './routes/users.routes.js';
import productsRouter from './routes/products.routes.js';

const app = express()
const PORT = 3000
app.use(express.json())


/* routers */
app.use('/api/users', userRouter)
app.use('/api/products', productsRouter)



app.listen (PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
    })
