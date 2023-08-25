import multer from "multer";


const upload = multer({
    storage: multer.diskStorage({
        destination:function(req,file,cb){
            cb(null,"middleware");
        },
        filename:function(req,file,cb){
            cb(null,file.fieldname+".pdf")
        }
    })
}).single("user_file");

export default upload;