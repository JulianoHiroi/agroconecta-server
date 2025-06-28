// src/config/multer.ts
import multer from "multer";
import path from 'path';
import crypto from 'crypto';

// Define o local e o nome do arquivo

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Define o diretório onde as imagens serão salvas
    console.log("ASda")
    const filepath = process.env.PATH_STORAGE_IMAGE ?? 'assets/images';
    // O caminho do .env será o caminho absoluto para a pasta de armazenamento que seria assets na raiz do projeto
    const dest = path.resolve(filepath);
    console.log('Salvando imagem em:', dest);
    cb(null, dest);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = crypto.randomBytes(6).toString('hex');
    const filename = `${uniqueSuffix}-${file.originalname}`;
    cb(null, filename);
  }
});


export const upload = multer({ storage });
