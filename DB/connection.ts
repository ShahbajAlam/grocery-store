import mongoose from "mongoose";

export default async function connectDB() {
    try {
        const uri = process.env.MONGODB_URI as string;
        await mongoose.connect(uri, {
            dbName: "grocery-store",
        });
        console.log("DB is connected successfully");
    } catch (error) {
        console.log(error);
    }
}
