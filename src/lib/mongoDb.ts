import { env } from "@/env";
import mongoose, { ConnectOptions } from 'mongoose';

function dbConnect(options: ConnectOptions = {}) {
    // check if we are already connected to the database
    if (mongoose.connection.readyState >= 1) return;

    // otherwise, create a new connection
    return mongoose.connect(env.MONGODB_URI, {
        ...options
    });
}

export default dbConnect;