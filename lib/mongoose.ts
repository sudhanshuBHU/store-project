import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI as string;

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable inside .env.local');
}

interface MongooseCache {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

const cached: MongooseCache = (global as { mongoose?: MongooseCache }).mongoose || { conn: null, promise: null };

if (!(global as { mongoose?: MongooseCache }).mongoose) {
  (global as { mongoose?: MongooseCache }).mongoose = cached;
}

async function dbConnect() {
  if (cached.conn) {
    // console.log('Connected to MongoDB');
    return cached.conn;
  }
  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI, {
      bufferCommands: false,
    }).then((mongoose) => {
      // console.log('Connected to MongoDB');
      return mongoose;
    });
  }
  cached.conn = await cached.promise;
  return cached.conn;
}

export default dbConnect; 