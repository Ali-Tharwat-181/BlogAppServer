import multer from "multer";
import path from "path";

const fileFilter = (req, file, cb) => {
  const extention = path.extname(file.originalname).toLowerCase();
  if (![".jpg", ".jpeg", ".png"].includes(extention)) {
    return cb(new Error("Only images are allowed (jpeg, jpg, png)"));
  }
  cb(null, true);
};

const upload = multer({
  storage: multer.memoryStorage(),
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
});

export default upload;
