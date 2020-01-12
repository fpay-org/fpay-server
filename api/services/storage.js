const { Storage } = require("@google-cloud/storage");
const data = require("../config/data");

const storage = new Storage({
  projectId: data.storage.PRJID,
  credentials: {
    client_email: data.storage.EMAIL,
    private_key: data.storage.KEY
  }
});

const bucket = storage.bucket(data.storage.CLOUD_BUCKET);

exports.storeFile = (path, file, cb) => {
  const blob = bucket.file(path + "/" + file.originalname);

  const blobStream = blob.createWriteStream({
    metadata: {
      contentType: file.mimetype
    }
  });

  blobStream.on("error", err => {
    cb(err, null);
  });

  blobStream.on("finish", () => {
    blob.makePublic().then(() => {
      cb(null, getPublicUrl(path, file.originalname));
    });
  });

  blobStream.end(file.buffer);
};

function getPublicUrl(path, filename) {
  return `https://storage.googleapis.com/${data.storage.CLOUD_BUCKET}/${path}/${filename}`;
}
