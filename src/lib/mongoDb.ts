import { env } from "@/env";
import mongoose, { ConnectOptions } from 'mongoose';

function dbConnect(options: ConnectOptions = {}) {
    // check if we are already connected to the database
    if (mongoose.connection.readyState >= 1) return;

    // otherwise, create a new connection
    // is development, use local database

    return mongoose.connect(env.NODE_ENV === 'development' ? 'mongodb://127.0.0.1:27017/bescoutr' : env.MONGODB_URI, {
        ...options
    });
}

export default dbConnect;