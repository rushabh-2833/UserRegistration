import mongoose from "mongoose";
import {} from 'dotenv/config'

const uri = process.env.MONGO_URI;

mongoose.connect(uri).then(()=>{"***************** Connected to Mongodb ***************"})
.catch((err)=>{console.log(err)})

const userSchema = mongoose.Schema({

    name : {type:String,required:true},
    email : {type:String,required:true},
    pwd : {type:String,required:true},

})

const userModel = mongoose.model("CIBC_Visitor",userSchema)

export default userModel