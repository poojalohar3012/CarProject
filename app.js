import dotenv from "dotenv"
dotenv.config()
import express from "express"
import cors from "cors";
import connectDB from "./config/connectDB.js"
import userRoutes from "./routes/userRoutes.js"
import adminRoutes from "./routes/adminRoutes.js"
import helmet from "helmet";
import bodyParser from "body-parser";
const app = express()
const port = process.env.PORT;
const DATABASE_URL = process.env.DATABASE_URL;

//cors policy
app.use(cors());

// hemlemt policy
// app.use(
//     helmet.contentSecurityPolicy({
//       directives: {
//         scriptSrc: ["'self'"],
//         styleSrc: ["'self'"],
//       },
//     })
//   );

// database connection
connectDB(DATABASE_URL)

//json
app.use(express.json());

app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true }));

//load routes
app.use("/api/user",userRoutes)
app.use("/api/admin",adminRoutes);



app.listen(port,()=>{
    console.log(`Server listening at http://localhost:${port}`);
})