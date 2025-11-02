import mongoose from "mongoose";
const connect=async()=>{

 try {
  await mongoose.connect(process.env.MONGODB_URI);
console.log(`Db is connect successfull`);

 } catch (error) {
  console.log(`Db is disconnected`,error);
  
 }

}

export default connect