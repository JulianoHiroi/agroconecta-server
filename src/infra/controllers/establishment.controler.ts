import { CreateEstablishmentRequestDTO, CreateEstablishmentResponseDTO, UpdateEstablishmentRequestDTO } from "../../domain/establishments/@types/establishmentsDTO";
import EstablishmentService from "../../domain/establishments/service/establishments.service";
import { AuthRequest } from "../polices/auth/auth.middleware";
import { Request, Response, NextFunction } from "express";
class EstablishmentController {
  constructor(private establishmentService: EstablishmentService) {}
  async createEstablishment(req: AuthRequest, res: Response) {
    const { name, logradouro, number, CEP, phone, description } = req.body;

    const imageProfileUrl = req.file?.filename;

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
      imageProfileUrl,
    };
    const establishment = await this.establishmentService.createEstablishment(data, userId);
    res.status(201).json(establishment);
  }
    async connectImageToEstablishment(req: AuthRequest, res: Response) {
        const { establishmentId } = req.params;
        const imagemPath = req.file?.filename; 
        console.log("Imagem Path:", imagemPath);
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
            urlImage: imagemPath, // Changed property name to match DTO
        };

        const image = await this.establishmentService.connectImageToEstablishment(data);
        return res.status(200).json(image);
    }

    async updateEstablishment(req: AuthRequest, res: Response) {
        const { id } = req.params;
        const { name, logradouro, number, CEP, phone, description } = req.body;
        const userId = req.userId;
        if (!userId) throw new Error("invalidToken");
        if (!id) return res.status(400).json({ error: "id is required" });
        const data: UpdateEstablishmentRequestDTO = {
            id,
            name,
            logradouro,
            number,
            CEP,
            phone,
            description,
            userId,
        };
        const establishment = await this.establishmentService.updateEstablishment(data, userId);
        return res.status(200).json(establishment);
    }

    async getAllEstablishmentsByUserId(req: AuthRequest, res: Response) {
        const userId = req.userId;
        if (!userId) throw new Error("invalidToken");
        const establishments = await this.establishmentService.findAllByUserId(userId);
        return res.status(200).json(establishments);
    }
    async delete(req: AuthRequest, res: Response) {
        const { id } = req.params;
        const userId = req.userId;
        if (!userId) throw new Error("invalidToken");

        if (!id) return res.status(400).json({ error: "id is required" });
        await this.establishmentService.delete(id , userId);
        return res.status(204).send();
    }

    async findById(req: Request, res: Response) {
        const { id } = req.params;
        if (!id) return res.status(400).json({ error: "id is required" });
        const establishment = await this.establishmentService.findById(id);
        if (!establishment) return res.status(404).json({ error: "Establishment not found" });
        return res.status(200).json(establishment);
    }

    async updateImageProfile(req: AuthRequest, res: Response) {
        const { id } = req.params;
        const imageProfileUrl = req.file?.filename;
        if (!imageProfileUrl) return res.status(400).json({ error: "Image file is required" });
        if (!id) return res.status(400).json({ error: "id is required" });
        const establishment = await this.establishmentService.updateImageProfile(id, imageProfileUrl);
        if (!establishment) return res.status(404).json({ error: "Establishment not found" });
        return res.status(200).json(establishment);
    }
    async searchEstablishmentsByFilter(req: AuthRequest, res: Response) {
   
        const { lat, lng , idTypeProduct, searchRadius , name} = req.body;


        if (!lat || !lng) {
            return res.status(400).json({ error: "Latitude and longitude are required" });
        }
        if(req.userId === undefined) {
            return res.status(400).json({ error: "User ID is required" });
        }
        const data = {
            lat: parseFloat(lat as string),
            lng: parseFloat(lng as string),
            idTypeProduct: idTypeProduct ? (idTypeProduct as string) : undefined,
            searchRadius: searchRadius ? parseInt(searchRadius as string) : undefined,
            name: name ? (name as string) : undefined,
            idUser: req.userId, // Assuming you want to include the user ID in the filter
        };
        if (isNaN(data.lat) || isNaN(data.lng)) {
            return res.status(400).json({ error: "Invalid latitude or longitude" });
        }


        const establishments = await this.establishmentService.searchEstablishmentsByFilter(data);
        return res.status(200).json(establishments);
    }


}

export default EstablishmentController;