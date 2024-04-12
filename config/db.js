import mongoose from "mongoose";

async function connectDB() {
  try {
    const con = await mongoose.connect(process.env.MONGODB_URI);
    console.log("db connected " + con.connection.host);
  } catch (error) {
    console.log(error);
  }
}

export default connectDB;
