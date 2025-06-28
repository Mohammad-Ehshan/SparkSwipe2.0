import mongoose from 'mongoose';


export const dbConnection = async () => {
  mongoose.connect(process.env.MONGODB_URI, {
   dbName: "SparkSwipe"
  }).then(() => {
    console.log("Database connected successfully");
  }).catch((error) => {
    console.error("Database connection failed:", error.message);
  });
};