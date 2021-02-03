import path from 'path';
import crypto from 'crypto';
import multer from 'multer';

const tmpDir = path.resolve(__dirname, '..', '..', 'tmp');

export default {
  directory: tmpDir,

  storage: multer.diskStorage({
    destination: tmpDir,
    filename(request, filename, callback) {
      const fileHash = crypto.randomBytes(10).toString('hex');
      const fileName = `${fileHash}-${filename.originalname}`;

      return callback(null, fileName);
    },
  }),
};
