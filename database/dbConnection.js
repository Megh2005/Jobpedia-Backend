import mongoose from "mongoose";

export const dbConnection = () => {
    mongoose.connect(process.env.MONGO_URI, {
        dbName: "Jobpedia"
    }).then(() => {
        console.log("Database Connection Successful")
    }).catch((err) => {
        console.log(`Error : ${err}`)
    });
};
