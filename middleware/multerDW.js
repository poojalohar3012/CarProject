import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";

fs.createReadStream("middleware/user_file-.pdf");
const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);


// if (fs.lstatSync("uploads/user_file-1692615030157.pdf").isDirectory()) {

//   console.log("yes")
// }

const download = function (req, res) {

  res.download(__dirname,"user_file-.pdf", function (err) {
    if (err) {
      console.log(err);
    }
  });
};

export default download;