import express from 'express';
import chatRoute from './routes/chatRoute.js'
import cors from 'cors'
const app= express();
const port= 4001


app.use(express.json());
app.use(
    cors({
        origin:process.env.ALLOWED_ORIGIN,
          methods:"GET,POST,PUT,DELETE",
        allowedHeaders: ['Content-Type', 'Authorization'],
    })
)

app.use('/api',chatRoute);



app.listen(port,()=>{
    console.log(`Server Started in Port`,port)
})


