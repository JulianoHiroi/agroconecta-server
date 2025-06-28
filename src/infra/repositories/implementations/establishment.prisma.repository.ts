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
            number: newEstablishment.number,
            CEP: newEstablishment.CEP,
            phone: newEstablishment.phone,
            description: newEstablishment.description ?? undefined,
        };
    }
    async connectImageToEstablishment(
        data: { establishmentId: string; imageUrl: string },
        userId: string
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

}

export default EstablishmentPrismaRepository;
