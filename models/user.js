import mongoose from "mongoose";

//Defining schema

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true
    },
    email:{
        type:String,
        required:true,
        trim:true
    },
    password:{
        type:String,
        required:true,
    },
    password_confirmation:{
        type:String,
        //required:true,
    },
    isAdmin:{
        type:String,
        default:false
    },
    tc:{
        type:Boolean,
        required:true,
    },
    createdAt:{
        type : Date,
        immutable: true,
        default : Date.now()
    },
    updatedAt:{
        type:Date,
        default: Date.now()
    }
})


userSchema.pre("save",function(){
    console.log("before saving in db",this)
})

// userSchema.pre("update",function(){
//     console.log("before saving in db",this)
// })

userSchema.post("save",function(doc){
    console.log("after saving in db",doc)
})


// userSchema.post("update",function(){
//     console.log("before saving in db",doc)
// })

// model
const UserModel = mongoose.model("user",userSchema);

export default UserModel