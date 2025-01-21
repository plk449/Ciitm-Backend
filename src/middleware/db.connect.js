import mongoose from 'mongoose';
import lolcat from 'lolcatjs';
import dotenv from 'dotenv';
dotenv.config();

// Define an asynchronous function to handle database connection
const connectToDatabase = async () => {
  try {
    lolcat.options.seed = Math.round(Math.random() * 1000);
    lolcat.options.colors = true;
    const connectionString = process.env.MONGO_URL;

    mongoose
      .connect(connectionString)
      .then(() => lolcat.fromString(`Conected to Db!`));
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    lolcat.fromObject(error);
  }
};

export default connectToDatabase;
