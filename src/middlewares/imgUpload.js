import { v4 as uuidv4 } from "uuid";
import multer from "fastify-multer";
import path, { dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const storage = multer.diskStorage({
  destination: path.join(__dirname, "../storage/imgs"),
  filename: function (req, file, cb) {
    cb(null, uuidv4() + path.extname(file.originalname).toLowerCase());
  },
});

export const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    // console.log(file);
    const filetypes = /jpeg|jpg|png|svg/;
    const mimetype = filetypes.test(file.mimetype);
    const extname = filetypes.test(path.extname(file.originalname));
    if (mimetype && extname) {
      return cb(null, true);
    }
    cb("Error: el archivo no es valido, debe ser jpeg|jpg|png|svg");
  },
});
