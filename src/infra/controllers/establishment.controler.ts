import { CreateEstablishmentRequestDTO, CreateEstablishmentResponseDTO } from "../../domain/establishments/@types/establishmentsDTO";
import EstablishmentService from "../../domain/establishments/service/establishments.service";
import { AuthRequest } from "../polices/auth/auth.middleware";
import { Request, Response, NextFunction } from "express";
class EstablishmentController {
  constructor(private establishmentService: EstablishmentService) {}
  async createEstablishment(req: AuthRequest, res: Response) {
    const { name, logradouro, number, CEP, phone, description } = req.body;
    const userId = req.userId;
    if (!userId) throw new Error("invalidToken");
    const data: CreateEstablishmentRequestDTO = {
      name,
      logradouro,
      number,
      CEP,
      phone,
      description,
      userId,
    };
    const establishment = await this.establishmentService.createEstablishment(data, userId);
    res.status(201).json(establishment);
  }
    async connectImageToEstablishment(req: AuthRequest, res: Response) {
        const { establishmentId } = req.params;
        const imagemPath = req.file?.filename; 
        console.log("Imagem Path:", imagemPath);
        return res.status(200).json({ message: "Image connected successfully", imagePath: imagemPath });
        if (!imagemPath) {
            return res.status(400).json({ error: "Image file is required" });
        }
        if (!establishmentId) {
            return res.status(400).json({ error: "Establishment ID is required" });
        }
        const userId = req.userId;
        if (!userId) throw new Error("invalidToken");
        const data = {
            establishmentId,
            imageUrl: imagemPath, // Assuming you want to store the path of the image
        };
    }

}

export default EstablishmentController;