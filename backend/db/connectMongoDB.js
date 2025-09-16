import mongoose from "mongoose";

export async function connectMongoDB() {
    await mongoose.connect(process.env.MONGO_URI)
    .then(()=>{console.log("Database connected!");
    })
    .catch(err=>{console.log(err, "Database connection fail");
        process.exit(1)
    })
}