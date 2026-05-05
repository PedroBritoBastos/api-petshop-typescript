import multer from "multer";

/**
 * this class deals with uploads
 */
export class Multer {
  private static storage = multer.diskStorage({
    filename: function (req, file, cb) {
      let name = new Date().getDate() + "-" + file.originalname;
      cb(null, name);
    },
    destination: function (req, file, cb) {
      let path = "../../data/photos/users";
      cb(null, path);
    },
  });

  public static upload = multer({ storage: Multer.storage });
}
