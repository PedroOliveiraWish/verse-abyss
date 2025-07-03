import express from 'express';
import cors from 'cors'
import routes from './routes';
import userRoutes from './routes/userRoute';

const app = express();

app.use(cors())
app.use(express.json())
app.use('/api', routes)
app.use('/auth', userRoutes);

const port = 3000;

app.listen(port, () => {
    console.log("Servidor rodando na porta: " + port)
})