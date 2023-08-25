import  express  from "express";
const router = express.Router();
import AdminController from "../controllers/adminController.js";
import checkUserAuth from "../middleware/authMiddleware.js";
import upload from "../middleware/multerUP.js"

router.use("/uploadBrochure",upload)

router.post("/companyRegister",AdminController.CompanyRegistration);
router.post("/addModels",AdminController.AddModels);
router.post("/uploadBrochure",AdminController.uploadBrochure);
router.put("/updateModel/:id",AdminController.updateModel);
router.delete("/deleteModel/:id",AdminController.deleteModel)

export default router