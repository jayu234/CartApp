import path from "path";
import multer from "multer";
import ErrorHandler from "../utils/ErrorHandler";

const destinationPath = path.resolve(__dirname, "..", "uploads");

const storage = multer.diskStorage({
  destination: destinationPath,
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname).toLowerCase();
    const date = Date.now();
    cb(null, file.fieldname + "_" + date + ext);
  },
});

const upload = multer({
  storage,
  fileFilter: function (req, file, cb) {
    const ext = path.extname(file.originalname).toLowerCase();
    if (ext !== ".jpg" && ext !== ".png") {
      return cb(
        new ErrorHandler(
          400,
          "Invalid file format. Only JPG and PNG are allowed."
        )
      );
    }
    cb(null, true);
  },
});

export default upload