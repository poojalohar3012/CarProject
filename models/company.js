import mongoose from "mongoose";

//Defining schema

const companySchema = new mongoose.Schema({
    CompanyName:{
        type:String,
        required:true,
        trim:true
    },
    About:{
        type:String,
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

// companySchema.pre("save",function(){
//     console.log("before saving in db",this)
// })

// // userSchema.pre("update",function(){
// //     console.log("before saving in db",this)
// // })

// companySchema.post("save",function(doc){
//     console.log("after saving in db",doc)
// })


// userSchema.post("update",function(){
//     console.log("before saving in db",doc)
// })

// model
const CompanyModel = mongoose.model("company",companySchema);

export default CompanyModel