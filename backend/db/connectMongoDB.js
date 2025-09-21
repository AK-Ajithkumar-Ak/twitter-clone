import mongoose from "mongoose";

export async function connectMongoDB() {
    await mongoose.connect(process.env.MONGO_URI)
    .then((prop)=>{console.log("Database connected!", prop.connection.host);
    })
    .catch(err=>{console.log(err, "Database connection fail");
        process.exit(1)
    })
}