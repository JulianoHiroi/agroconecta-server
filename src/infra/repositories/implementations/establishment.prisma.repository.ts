import { PrismaClient } from "@prisma/client";
import EstablishmentRepository from "../establishment.repository";
import { ConnectImageToEstablishmentsResponseDTO, CreateEstablishmentRequestDTO , CreateEstablishmentResponseDTO} from "../../../domain/establishments/@types/establishmentsDTO";

/*
model Establishments {
  id                   String                 @id @default(uuid())
  name                 String
  logradouro           String
  number               String
  CEP                  String
  phone                String
  description          String?
  idUser               String
  user                 User                   @relation(fields: [idUser], references: [id])
  EstablishmentsImages EstablishmentsImages[]
}

*/

const prisma = new PrismaClient();
class EstablishmentPrismaRepository implements EstablishmentRepository {
    async create(establishment: CreateEstablishmentRequestDTO): Promise<CreateEstablishmentResponseDTO> {
        const newEstablishment = await prisma.establishments.create({
            data: {
                name: establishment.name,
                logradouro: establishment.logradouro,
                latitue: establishment.latitue,
                longitude: establishment.longitude,
                number: establishment.number,
                CEP: establishment.CEP,
                phone: establishment.phone,
                description: establishment.description,
                idUser: establishment.userId,
            },
        });

        return {
            id: newEstablishment.id,
            name: newEstablishment.name,
            logradouro: newEstablishment.logradouro,
            latitue: newEstablishment.latitue,
            longitude: newEstablishment.longitude,
            number: newEstablishment.number,
            CEP: newEstablishment.CEP,
            phone: newEstablishment.phone,
            description: newEstablishment.description ?? undefined,
        };
    }
    async connectImageToEstablishment(
        data: { establishmentId: string; imageUrl: string },
    ): Promise<ConnectImageToEstablishmentsResponseDTO> {
        const newImage = await prisma.establishmentsImages.create({
            data: {
                urlImage: data.imageUrl,
                establishmentId: data.establishmentId,
            },
        });

        return {
            id: newImage.id,
            urlImage: newImage.urlImage,
            establishmentId: newImage.establishmentId,
        };
    }
    async findById(id: string): Promise<CreateEstablishmentResponseDTO | null> {
        const establishment = await prisma.establishments.findUnique({
            where: { id },
        });

        if (!establishment) {
            return null;
        }

        return {
            id: establishment.id,
            name: establishment.name,
            logradouro: establishment.logradouro,
            latitue: establishment.latitue,
            longitude: establishment.longitude,
            number: establishment.number,
            CEP: establishment.CEP,
            phone: establishment.phone,
            description: establishment.description ?? undefined,
        };
    }
    
    async update(
        id: string,
        data: Partial<CreateEstablishmentRequestDTO>,
    ): Promise<CreateEstablishmentResponseDTO> {
        const updatedEstablishment = await prisma.establishments.update({
            where: { id },
            data: {
                name: data.name,
                logradouro: data.logradouro,
                latitue: data.latitue,
                longitude: data.longitude,
                number: data.number,
                CEP: data.CEP,
                phone: data.phone,
                description: data.description,
            },
        });

        return {
            id: updatedEstablishment.id,
            name: updatedEstablishment.name,
            logradouro: updatedEstablishment.logradouro,
            latitue: updatedEstablishment.latitue,
            longitude: updatedEstablishment.longitude,
            number: updatedEstablishment.number,
            CEP: updatedEstablishment.CEP,
            phone: updatedEstablishment.phone,
            description: updatedEstablishment.description ?? undefined,
        };
    }

    async findAllByUserId(userId: string): Promise<CreateEstablishmentResponseDTO[]> {
        const establishments = await prisma.establishments.findMany({
            where: { idUser: userId },
        });

        return establishments.map(establishment => ({
            id: establishment.id,
            name: establishment.name,
            logradouro: establishment.logradouro,
            latitue: establishment.latitue,
            longitude: establishment.longitude,
            number: establishment.number,
            CEP: establishment.CEP,
            phone: establishment.phone,
            description: establishment.description ?? undefined,
        }));
    }
    
    async delete(id: string): Promise<void> {
        await prisma.establishments.delete({
            where: { id },
        });
    }


}

export default EstablishmentPrismaRepository;
