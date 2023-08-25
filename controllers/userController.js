import UserModel from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import multer from "multer";
import transporter from "../config/emailConfig.js";
import CompanyModel from "../models/company.js";
import CarModel from "../models/carModel.js";

class UserController{
    static userRegistration = async (req,res)=>{
        const {name,email,password,password_confirmation,tc} = req.body;
        const user = await UserModel.findOne({email:email})
        if(user){
            res.send({"status":"failed","message":"Email already exist"})
        }
        else{
            if(name && email && password && password_confirmation && tc){
                if(password === password_confirmation){
                    try{
                        const salt = await bcrypt.genSalt(10);
                        const hashPassword = await bcrypt.hash(password,salt)
                        const doc = new UserModel({
                        name:name,
                        email:email,
                        password:hashPassword,
                        
                        tc:tc
                    })
                    await doc.save();
                    const saved_user = await UserModel.findOne({email:email})
                    // generate JWT token
                    const token = jwt.sign({userID:saved_user._id},process.env.JWT_SECRET_KEY,{expiresIn:"5d"})
                    res.status(201).send({"status":"success","message":"Registration Success","token":token})
                    }catch(err){
                        console.log(err);
                        res.send({"status":"failed","message":"Unable to register"})
                    }
                }
                else{
                    res.send({"status":"failed","message":"Password does not match"})    
                }
            }
            else{
                res.send({"status":"failed","message":"All fields are required"})   
            }
        }
    }

    static userLogin = async (req,res)=>{
        try{
            const {email,password} = req.body
            if(email && password){
                const user =  await UserModel.findOne({email:email});
                if(user != null){
                    const isMatch = await bcrypt.compare(password,user.password)
                    if((user.email === email) && isMatch){
                        // generate token
                        const token = jwt.sign({userID:user._id},process.env.JWT_SECRET_KEY,{expiresIn:"1h"})
                        res.send({"status":"success","message":"Login Success","token":token})     
                    } else{
                        res.send({"status":"failed","message":"Email or password is not valid"})
                    }
                }
                else{
                    res.send({"status":"failed","message":"Your are not registerd user"})  
                }
            }
            else{
                res.send({"status":"failed","message":"All fields are required"})  
            }
        }catch(err){
            console.log(err);
            res.send({"status":"failed","message":"Unable to login"})  
        }
    }
    static changeUserPassword =  async(req,res)=>{
       // console.log(req.body)
        const { password,password_confirmation } = req.body
        if(password && password_confirmation){
            if(password !== password_confirmation){
                res.send({"status":"failed","message":"password and confirm password does not match"})  
            }else{
                const salt = await bcrypt.genSalt(10);
                const newHashPassword = await bcrypt.hash(password,salt);
                await UserModel.findByIdAndUpdate(req.user._id,{$set:{password:newHashPassword}})
               //console.log(req.user._id);

                res.status(201).send({"status":"success","message":"Password changed successfully"})    
                

            }
        }
        else{
            res.send({"status":"failed","message":"All field are required"})  
        }
    }
    static loggedUser = async (req,res)=>{
        res.send({"user":req.user});
    }
    static sendUserPasswordResetEmail = async(req,res)=>{
        const {email} = req.body;
        if(email){
            const user =  await UserModel.findOne({email:email});
            if(user){
                const secret = user._id + process.env.JWT_SECRET_KEY
                const token = jwt.sign({userID:user._id},secret,{expiresIn:"15m"})
                const link = `http://127.0.0.1:3000/api/user/reset/${user._id}/${token}`;
                console.log(link);
                //send email
                let info = await transporter.sendMail({
                    from:process.env.EMAIL_FROM,
                    to:user.email,
                    subject:"CarProject - Password reset link",
                    html:`<a href=${link}>Click Here</a> to Reset your password`
                })
                res.send({"status":"success","message":"Password Reset Email Sent....Please check your email","info":info})     

            }
            else{
                res.send({"status":"failed","message":"Email does not exist"})
            }
        }
        else{
            res.send({"status":"failed","message":"Email field is required"})
        }
    }

    static userPasswordReset = async (req,res)=>{
        const {password,password_confirmation} = req.body 
        const {id,token} = req.params
        const user = await UserModel.findById(id)
        const new_secret = user._id + process.env.JWT_SECRET_KEY
        try{
            jwt.verify(token,new_secret)
            if(password && password_confirmation){
                if(password !== password_confirmation){
                    res.send({"status":"failed","message":"All field is required"})
                }
                else{
                    const salt = await bcrypt.genSalt(10);
                    const newHashPassword = await bcrypt.hash(password,salt);
                    await UserModel.findByIdAndUpdate(user._id,{$set:{password:newHashPassword}})
                    res.send({"status":"success","message":"Password Reset Successfully"})     
                }
            }
            else{
                res.send({"status":"failed","message":"All field is required"})
            }
            }
        catch(err){
            console.log(err)
            res.send({"status":"failed","message":"Invalid token"})
        }
    }

    static DisplayCompanyInfo = async(req,res)=>{
        const { CompanyName } = req.body
        const companyName =  await CompanyModel.findOne({CompanyName:CompanyName});
        if(companyName){
            res.send(companyName.About);
        }else{
            res.send({"status":"failed","message":"Invalid input"})
        }
    }
    static DisplayModels = async(req,res)=>{
        const { CompanyName } = req.body

        const companyName =  await CarModel.find({CompanyName:CompanyName});
        if(companyName){
            res.send(companyName);
        }else{
            res.send({"status":"failed","message":"Invalid input"})
        }
    }
    
    static downloadBrochure = (req,res)=>{

        try{
            multer({
                storage: multer.diskStorage({
                    destination:function(req,file,cb){
                        cb(null,"download");
                    },
                    filename:function(req,file,cb){
                        cb(null,file.fieldname+"-"+Date.now()+".jpg")
                    }
                })
            }).single("user_file");   
            res.send({"status":"success","message":"file downloaded"})

        }catch(err){
            console.log(err);
                res.send({"status":"failed","message":"Unable to upload"})

        }  
    }






}

export default UserController