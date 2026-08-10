import mongoose from "mongoose";

export default async function connectDb() {
    try {
        if (mongoose.connection.readyState === 1) {
            console.log('Already connected')
            return
        }
        else {
            await mongoose.connect(process.env.DB_URI, {
                dbName: 'devHub'
            })
            console.log('Database connected')
        }

    } catch (err) {
        console.log(err)
        console.log('Database not connected')
        process.exit(1)
    }
}
