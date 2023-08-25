import mongoose from "mongoose";

//Defining schema

const carModelSchema = new mongoose.Schema({
    CompanyName:{
        type:String,
        required:true,
        trim:true
    },
    BrandName:{
        type:String,
        required:true,
        trim:true
    },
    Varients:{
        type:String,
        required:true
    },
    Specification:{
        Engine:{
            type:{
                type:String,
                required:true,
            },
            fuel:{
                type:String,
                required:true,
            },
            capacity:{
                type:String,
                required:true,
            }
        },
        Transmission:{
            type:String,
            required:true
        },
        FuelTank:{
            type:Number
        }  
    },
    Price:{
        type:String,
        required:true, 
    },
    Color:{
        type:String,
        required:true
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

// carModelSchema.pre("save",function(){
//     console.log("before saving in db",this)
// })

// // userSchema.pre("update",function(){
// //     console.log("before saving in db",this)
// // })

// carModelSchema.post("save",function(doc){
//     console.log("after saving in db",doc)
// })


// userSchema.post("update",function(){
//     console.log("before saving in db",doc)
// })

// model
const CarModel = mongoose.model("carmodel",carModelSchema);

export default CarModel