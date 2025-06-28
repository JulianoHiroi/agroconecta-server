import path from "path";
import { Request, Response } from "express";

class ImageController {
  constructor() {}

    async getImage(request: Request, response: Response){
        console.log("Request Params:", request.params);
        const { imageFilename } = request.params;
        
        
        // Define o caminho do arquivo de imagem
        // Utilize o caminho absoluto para a pasta de armazenamento que seria assets na raiz do projeto que está no .env
        const filepath = process.env.PATH_STORAGE_IMAGE ?? 'assets/images';
        const imagePath = path.resolve(filepath, imageFilename);
        console.log('Image Path:', imagePath);

        // Envia o arquivo de imagem como resposta
        response.sendFile(imagePath, (err) => {
            if (err) {
                console.error("Error sending image:", err);
                response.status(404).send("Image not found");
            } else {
                console.log("Image sent successfully");
            }
        });


    }
}

export default ImageController;