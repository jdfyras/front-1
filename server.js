import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import http from 'http';
import morgan from 'morgan';

import { Server } from 'socket.io';

import connectDB from './config/db.js';
import routes from './routes/index.js';
import dataRoutes from './routes/dataRoutes.js';
import Engine from './middlewares/apareilingine.js';

dotenv.config();

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: '*', // Adjust according to your CORS policy
        methods: ['GET', 'POST']
    }
});

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
    cors({
        credentials: true,
        origin: true // Or specify your allowed origins
    })
);

app.use('/', routes);
app.use('/', dataRoutes);

// Global error handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

const port = process.env.PORT || 4000;
server.listen(port, () => {
    connectDB(); // Ensure your DB connection method handles reconnects
    console.log(`Server is listening on port ${port}`);
});

const engine = new Engine({ agents: 24 }, io);
engine.init();
engine.run();

io.on('connection', (socket) => {
    // console.log('A user connected');

    socket.on('disconnect', () => {
        // console.log('User disconnected');
    });

    socket.on('setup', (userData) => {
        console.log(userData);
        console.log('Setup event received');
        socket.join(userData._id);
        socket.emit('connected');
    });
});
