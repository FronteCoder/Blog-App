import mongoose from "mongoose";

 const connectToDB=async()=>{
    const connectionURL="mongodb+srv://shivammishrapython:mango123@cluster0.awucexv.mongodb.net/"
    mongoose.connect(connectionURL).then(()=>{
        console.log("Database Connection succesfully");
    }).catch(()=>{
        console.log("Database Connection succesfully");
    })
}
export default connectToDB;