const multer = require('multer');

const randomString = require('randomstring');

exports.uploadImage = function (desFolder) {
  const fileStorage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, `images/${desFolder}`);
    },
    filename: (req, file, cb) => {
      cb(null, `${randomString.generate(10)}.jpg`);
    },
  });

  const fileFilter = (req, file, cb) => {
    if (
      file.mimetype === 'image/png' ||
      file.mimetype === 'image/jpg' ||
      file.mimetype === 'image/jpeg'
    ) {
      cb(null, true);
    } else {
      cb(null, false);
    }
  };

  return multer({ storage: fileStorage, fileFilter: fileFilter }).single(
    'image'
  );
};
