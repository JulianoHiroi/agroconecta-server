import { PrismaClient } from "@prisma/client";
import ProductRepository from "../product.repository";
import { ConnectProductToEstablishmentRequestDTO, ConnectProductToEstablishmentResponseDTO, CreateProductDTO, CreateProductResponseDTO, UpdateProductDTO, UpdateProductResponseDTO } from "../../../domain/product/@types/productsDTO";
import { ConnectImageToEstablishmentsRequestDTO } from "../../../domain/establishments/@types/establishmentsDTO";

const prisma = new PrismaClient();
class ProductPrismaRepository implements ProductRepository {
    async createProduct(data: CreateProductDTO): Promise<CreateProductResponseDTO> {
        const product = await prisma.product.create({
            data: {
                price: data.price,
                description: data.description,
                idTypeProduct: data.idTypeProduct,
                userId: data.userId, // Assuming userId is part of CreateProductDTO
            },
        });
        const tipoproduto = await prisma.typeProduct.findUnique({
            where: {
                id: data.idTypeProduct,
            },
            select: {
                id: true,
                name: true,
            },
        });
        if (!tipoproduto) {
            throw new Error("Type product not found");
        }
        return {
            id: product.id,
            price: product.price,
            description: product.description,
            idTypeProduct: product.idTypeProduct,
            name: tipoproduto.name, // Assuming you want to return the name of the type product
        };
    }
    getTypeProducts(id: string): Promise<{ id: string; name: string }[]> {
        return prisma.typeProduct.findMany({
            where: {
                id: id,
            },
            select: {
                id: true,
                name: true,
            },
        });
    }
    getAllTypesProducts(): Promise<{ id: string; name: string }[]> {
        return prisma.typeProduct.findMany({
            select: {
                id: true,
                name: true,
            },
        });
    }

    async updateProduct(data: UpdateProductDTO): Promise<UpdateProductResponseDTO> {
        const product = await prisma.product.update({
            where: {
                id: data.id,
            },
            data: {
                price: data.price,
                description: data.description,
            },
            select: {
                id: true,
                price: true,
                description: true,
                idTypeProduct: true,
            }
        });

        const tipoproduto = await prisma.typeProduct.findUnique({
            where: {
                id: data.idTypeProduct,
            },
            select: {
                id: true,
                name: true,
            },
        });
        if (!tipoproduto) {
            throw new Error("Type product not found");
        }
        return {
            id: product.id,
            price: product.price,
            description: product.description,
            idTypeProduct: product.idTypeProduct,
            name: tipoproduto.name, // Assuming you want to return the name of the type product
        };
    }

    async findAllByUserId(userId: string): Promise<CreateProductResponseDTO[] | null> {
        const products = await prisma.product.findMany({
            where: { userId },
            include: {
                typeProduct: {
                    select: {
                        id: true,
                        name: true,
                    },
                },
            },
        });

        if (!products || products.length === 0) {
            return null;
        }

        return products.map(product => ({
            id: product.id,
            price: product.price,
            description: product.description,
            idTypeProduct: product.idTypeProduct,
            name: product.typeProduct.name, // Assuming you want to return the name of the type product
        }));
    }
    async findById(id: string): Promise<CreateProductResponseDTO | null> {
        const product = await prisma.product.findUnique({
            where: { id },
            include: {
                typeProduct: {
                    select: {
                        id: true,
                        name: true,
                    },
                },
            },
        });

        if (!product) {
            return null;
        }

        return {
            id: product.id,
            price: product.price,
            description: product.description,
            idTypeProduct: product.idTypeProduct,
            name: product.typeProduct.name, // Assuming you want to return the name of the type product
        };
    }
    async delete(id: string): Promise<void> {
        await prisma.product.delete({
            where: { id },
        });
    }
    async findAllByEstablishmentId(establishmentId: string): Promise<CreateProductResponseDTO[] | null> {
        const products = await prisma.establishments_Products.findMany({
            where: { establishmentId },
            include: {
                product: {
                    select: {
                        id: true,
                        price: true,
                        description: true,
                        idTypeProduct: true,
                        typeProduct: {
                            select: {
                                id: true,
                                name: true,
                            },
                        },
                    },
                },
            },
        });

        // Faz o calculo da média dos valorede de rating das avaliações

        const response = await Promise.all(products.map(async ep => {
            const avaliations = await prisma.avaliation.findMany({
                where: { productId: ep.product.id },
                select: { rating: true },
            });
            const avaliationRating = avaliations.length > 0
                ? avaliations.reduce((sum, av) => sum + av.rating, 0) / avaliations.length
                : undefined; // Return undefined if there are no ratings
            return {
                id: ep.product.id,
                price: ep.product.price,
                description: ep.product.description,
                idTypeProduct: ep.product.idTypeProduct,
                name: ep.product.typeProduct.name,
                avaliationRating: avaliationRating, // Now a number or undefined
            };
        }));
        return response;
    }

    async connectProductToEstablishment(data: ConnectProductToEstablishmentRequestDTO): Promise<ConnectProductToEstablishmentResponseDTO | null> {
        const establishmentProduct = await prisma.establishments_Products.create({
            data: {
                establishmentId: data.establishmentId,
                productId: data.productId,
                quantity: data.quantity,
            },
            select: {
                id: true,
                establishmentId: true,
                productId: true,
                quantity: true,
            },
        });

        if (!establishmentProduct) {
            return null;
        }

        return {
            id: establishmentProduct.id,
            establishmentId: establishmentProduct.establishmentId,
            productId: establishmentProduct.productId,
            quantity: data.quantity, // Assuming you want to return the quantity as well
        };
    }

    async findConnectionByEstablishmentAndProduct(
        establishmentId: string,
        productId: string
    ): Promise<ConnectProductToEstablishmentResponseDTO | null> {
        const connection = await prisma.establishments_Products.findUnique({
            where: {
                establishmentId_productId: {
                    establishmentId,
                    productId,
                },
            },
            select: {
                id: true,
                establishmentId: true,
                productId: true,
                quantity: true, // Assuming you want to return the quantity as well
            },
        });

        if (!connection) {
            return null;
        }

        return {
            id: connection.id,
            establishmentId: connection.establishmentId,
            productId: connection.productId,
            quantity: connection.quantity, // Assuming you want to return the quantity as well
        };
    }
    async deleteConnectionByEstablishmentAndProduct(
        establishmentId: string,
        productId: string
    ): Promise<void> {
        await prisma.establishments_Products.delete({
            where: {
                establishmentId_productId: {
                    establishmentId,
                    productId,
                },
            },
        });
    }

    async makeAvaliation(
        productId: string,
        userId: string,
        rating: number,
    ): Promise<void> {
        const existingAvaliation = await prisma.avaliation.findFirst({
            where: {
                productId,
                userId,
            },
        });

        if (existingAvaliation) {
            await prisma.avaliation.update({
                where: {
                    id: existingAvaliation.id,
                },
                data: {
                    rating,
                },
            });
        } else {
            await prisma.avaliation.create({
                data: {
                    productId,
                    userId,
                    rating,
                },
            });
        }
    }
}

export default ProductPrismaRepository;