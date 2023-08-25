import UserModel from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import CompanyModel from "../models/company.js";
import CarModel from "../models/carModel.js";
import multer from "multer";

class AdminController{
    static CompanyRegistration = async (req,res)=>{
            const {CompanyName,About} = req.body;
            const company = await CompanyModel.findOne({CompanyName:CompanyName})
            if(company){
                res.send({"status":"failed","message":"Company name is already exist"})
            }
            else{
                if(CompanyName && About){
                    try{    
                        const doc = new CompanyModel({
                        CompanyName:CompanyName,
                        About:About,
                        })
                        await doc.save();
                        res.status(201).send({"status":"success","message":"Registration Success"})
                    }catch(err){
                        console.log(err);
                        res.send({"status":"failed","message":"Unable to register"})
                    }
                }
                else{
                    res.send({"status":"failed","message":"All fields are required"})   
                }
            }
        }

        static AddModels = async (req,res)=>{
            const {CompanyName,BrandName,Varients,Specification,Price,Color} = req.body;
            const model = await CarModel.findOne({BrandName:BrandName} && {Varients:Varients})
            if(model){
                res.send({"status":"failed","message":"already exist"})
            }
            else{
                try{    
                    const doc = new CarModel({
                        CompanyName:CompanyName,
                        BrandName:BrandName,
                        Varients:Varients,
                        Specification:Specification,
                        Price:Price,
                        Color:Color
                    })
                    await doc.save();
                    res.status(201).send({"status":"success","message":"Model Added"})
                }catch(err){
                    console.log(err);
                    res.send({"status":"failed","message":"Unable to Add"})
                }
            }
        }

        static uploadBrochure = (req,res)=>{

            try{
                multer({
                    storage: multer.diskStorage({
                        destination:function(req,file,cb){
                            cb(null,"uploads");
                        },
                        filename:function(req,file,cb){
                            cb(null,file.fieldname+"-"+Date.now()+".jpg")
                        }
                    })
                }).single("user_file");   
                res.send({"status":"success","message":"file Uploaded"})

            }catch(err){
                console.log(err);
                    res.send({"status":"failed","message":"Unable to upload"})

            }  
        }
            
        static updateModel = async(req,res)=>{
            const {CompanyName,BrandName,Varients,Specification,Price,Color} = req.body;

            const doc = {
                CompanyName:CompanyName,
                BrandName:BrandName,
                Varients:Varients,
                Specification:Specification,
                Price:Price,
                Color:Color
            }
            try{

                let id = req.params.id;
                let result = await CarModel.findByIdAndUpdate(req.params.id,doc);
                res.send({"status":"success","message":"Updated"})

            }catch(err){
                
                res.send({"status":"failed","message":"Unable to update"})
              
            }
        }
        static deleteModel = async(req,res)=>{
            
            try{
                const model = await CarModel.findByIdAndDelete(req.params.id)
                if(model == null){
                    
                    res.send({"status":"failed","message":"model doesnt exist"})
                }
                else{
                     res.send({"status":"success","message":"model deleted"})
                }

            }catch(err){
                res.send({"status":"failed","message":"Unable to delete"})
            }
             
        }
        
        
    
}

export default AdminController