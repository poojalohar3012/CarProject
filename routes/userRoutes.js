import  express  from "express";
const router = express.Router();
import UserController from "../controllers/userController.js";
import checkUserAuth from "../middleware/authMiddleware.js";
import download from "../middleware/multerDW.js"
// route lebel middleware
router.use("/changepassword",checkUserAuth)
router.use("/loggeduser",checkUserAuth)
router.use("/downloadBrochure",download)


// public route
router.post("/register",UserController.userRegistration)
router.post("/login",UserController.userLogin)
router.post("/send-reset-password-email",UserController.sendUserPasswordResetEmail)
router.post("/reset-password/:id/:token",UserController.userPasswordReset)
router.get("/downloadBrochure",UserController.downloadBrochure);
router.get("/displayCompanyInfo",UserController.DisplayCompanyInfo);
router.get("/displayModels",UserController.DisplayModels);


// protected route
router.post("/changepassword",UserController.changeUserPassword)
router.get("/loggeduser",UserController.loggedUser)


export default router