const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: '../All-In-One-Front/uploads/', // Le dossier où les fichiers téléchargés seront stockés
  filename(req, file, cb) {
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1E9)}`;
    // Récupérer l'extension d'origine du fichier téléchargé
    const fileExtension = path.extname(file.originalname);
    // Concaténer le nom du fichier avec son extension
    cb(null, uniqueSuffix + fileExtension);
  },
});
const multerUpload = multer({ storage });

module.exports = multerUpload;
