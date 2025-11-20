import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import cookieParser from 'cookie-parser';
import connectDB from './config/db.js';
import authRouter from './routes/auth.js';
import userRouter from './routes/user.js'

const app = express();
const port = process.env.PORT || 4000;
connectDB();

const allowedOrigins = ['http://localhost:5173', 'https://iyyappan-mern-auth.netlify.app' ]

const corsOptions = {
  origin: function(origin, callback) {
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true
};


app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());


app.use('/api/auth', authRouter);
app.use('/api/user', userRouter);

app.get('/',(req,res) => res.send("API WORKING fine"));

app.listen(port, ()=> console.log(`Server started on port: ${port}`));


