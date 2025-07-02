import { PrismaClient } from "@prisma/client";
import EstablishmentRepository from "../establishment.repository";
import { ConnectImageToEstablishmentsResponseDTO, CreateEstablishmentRequestDTO, CreateEstablishmentResponseDTO, SearchEstablishmentsByFilterRequestDTO, SearchEstablishmentsByFilterResponseDTO } from "../../../domain/establishments/@types/establishmentsDTO";

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

        const images = await prisma.establishmentsImages.findMany({
            where: { establishmentId: id },
        });

        const products = await prisma.establishments_Products.findMany({
            where: { establishmentId: id },

            include: {
                product: {
                    select: {
                        id: true,
                        price: true,
                        description: true,
                        idTypeProduct: true,
                        typeProduct: {
                            select: {
                                name: true,
                            },
                        },
                    },
                },
            },
        });
        // faz a busca das avaliações para cada produto e calcula a média de avaliações
        const AvaliationsProducts = await prisma.avaliation.findMany({
            where: {
                productId: {
                    in: products.map(product => product.product.id),
                },
            },
            select: {
                productId: true,
                rating: true,
            },
        });
        // Faz o calculo da média dos valorede de rating das avaliações
        const averageRatings = AvaliationsProducts.reduce((acc: {
            [productId: string
            ]: { total: number; count: number }
        }, avaliation) => {
            if (!acc[avaliation.productId]) {
                acc[avaliation.productId] = { total: 0, count: 0 };
            }
            acc[avaliation.productId].total += avaliation.rating;
            acc[avaliation.productId].count += 1;
            return acc;
        }, {});

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
            imageProfileUrl: establishment.urlImageProfile ?? undefined,
            images: images.map(image => ({
                id: image.id,
                url: image.urlImage,
            })),
            products: products.map(ep => {
                const ratingData = averageRatings[ep.product.id];
                const avaliationRating = ratingData ? ratingData.total / ratingData.count : undefined;
                return {
                    id: ep.product.id,
                    price: ep.product.price,
                    description: ep.product.description,
                    idTypeProduct: ep.product.idTypeProduct,
                    name: ep.product.typeProduct.name, // Assuming you want to return the name of the type product
                    quantity: ep.quantity ?? 0, // Assuming quantity is a field in Establishments_Products
                    ratingAvaliation: avaliationRating, // Optional field for average rating
                };
            }),
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
            imageProfileUrl: establishment.urlImageProfile ?? undefined,
            number: establishment.number,
            CEP: establishment.CEP,
            phone: establishment.phone,
            description: establishment.description ?? undefined,
        }));
    }

    async delete(id: string): Promise<void> {
        //Faça o delete em cascata para as imagens
        await prisma.establishmentsImages.deleteMany({
            where: { establishmentId: id },
        });
        await prisma.establishments_Products.deleteMany({
            where: { establishmentId: id },
        });

        await prisma.establishments.delete({
            where: { id },
        });

    }

    async updateImageProfile(
        id: string,
        imageProfileUrl: string,
    ): Promise<CreateEstablishmentResponseDTO | null> {
        const updatedEstablishment = await prisma.establishments.update({
            where: { id },
            data: { urlImageProfile: imageProfileUrl },
        });

        if (!updatedEstablishment) {
            return null;
        }

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
            imageProfileUrl: updatedEstablishment.urlImageProfile ?? undefined,
        };
    }

    async searchByFilter(
        filter: SearchEstablishmentsByFilterRequestDTO
    ): Promise<SearchEstablishmentsByFilterResponseDTO[]> {
        if (!filter || !filter.idUser) {
            return [];
        }

        let query = `
    SELECT e.id, e.name, e.latitue, e.longitude
    FROM "Establishments" e
    LEFT JOIN "Establishments_Products" ep ON e.id = ep."establishmentId"
    LEFT JOIN "Product" p ON ep."productId" = p.id 
    WHERE e."idUser" != $1
  `;

        const params: any[] = [filter.idUser];
        let paramIndex = 2;

        if (filter.name) {
            query += ` AND e.name ILIKE $${paramIndex}`;
            params.push(`%${filter.name}%`);
            paramIndex++;
        }

        if (filter.idTypeProduct) {
            query += ` AND p."idTypeProduct" = $${paramIndex}`;
            params.push(filter.idTypeProduct);
            paramIndex++;
        }

        query += ` GROUP BY e.id, e.name, e.latitue, e.longitude, e.logradouro`;

        console.log("Executing query:", query, "with params:", params);

        const establishments = await prisma.$queryRawUnsafe<SearchEstablishmentsByFilterResponseDTO[]>(
            query,
            ...params
        );

        console.log("Establishments found:", establishments);

        if (filter.searchRadius && filter.lat && filter.lng) {
            const radius = filter.searchRadius / 1000; // Convert radius from meters to kilometers
            const lat = filter.lat;
            const lng = filter.lng;

            return establishments.filter(establishment => {
                const distance = this.calculateDistance(lat, lng, establishment.latitue, establishment.longitude);
                console.log(`Distance from user to establishment ${establishment.id}: ${distance} km`);

                return distance <= radius;
            });
        }

        return establishments;
    }

    private calculateDistance(lat1: number, lng1: number, lat2: number, lng2: number): number {
        const R = 6371; // Radius of the Earth in kilometers
        const dLat = this.degreesToRadians(lat2 - lat1);
        const dLng = this.degreesToRadians(lng2 - lng1);
        const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(this.degreesToRadians(lat1)) * Math.cos(this.degreesToRadians(lat2)) *
            Math.sin(dLng / 2) * Math.sin(dLng / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        return R * c; // Distance in kilometers
    }
    private degreesToRadians(degrees: number): number {
        return degrees * (Math.PI / 180);
    }

}

export default EstablishmentPrismaRepository;
