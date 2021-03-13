import express from 'express';
import mongoose from 'mongoose';
import { json } from 'body-parser';
import { router } from './routes';

const app = express();
const port = 8080;

app.use(json());

app.use(router);

const start = async () => {

    try {
        // Connect to MongoDB
        await mongoose.connect('mongodb://127.0.0.1:27017/storelift', {
            useNewUrlParser: true,
            useCreateIndex: true
        });
        console.log('Connected to MongoDB');
    }
    catch(err) {
        console.error(err);
    }

    app.listen(port, () => {
        console.log(`Application running on port ${port}`);
    })
}

start();