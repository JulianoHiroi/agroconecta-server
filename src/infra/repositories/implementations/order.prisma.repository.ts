import { PrismaClient } from "@prisma/client";
import OrderRepository from "../order.repository";
import { CreateOrderDTO, CreateOrderResponseDTO, GetOrderResponseDTO } from "../../../domain/order/@types/orderDTO";

const prisma = new PrismaClient();
class OrderPrismaRepository implements OrderRepository {

    async createOrder(data: CreateOrderDTO): Promise<CreateOrderResponseDTO> {

        if (!data.userId || !data.productId || !data.establishmentId) {
            throw new Error("User ID, Product ID, and Establishment ID are required.");
        }
        // Validate user
        const user = await prisma.user.findUnique({
            where: { id: data.userId },
        });
        if (!user) {
            throw new Error("User not found");
        }
        // Check if user product exists
        const product = await prisma.product.findUnique({
            where: { id: data.productId },
        });
        if (!product) {
            throw new Error("Product not found");
        }
        const establishmentProduct = await prisma.establishments_Products.findFirst({
            where: {
                productId: data.productId,
                establishmentId: data.establishmentId,
            },
        });
        if (!establishmentProduct) {
            throw new Error("Product not found in the specified establishment");
        }


        const order = await prisma.order.create({
            data: {
                userId: data.userId,
                userProductId: product.userId,
                productId: data.productId,
                establishmentId: data.establishmentId,
                establishmentProductId: establishmentProduct.id,
                amoutPayment: product.price * data.quantity, // Assuming price is in the produc
                quantity: data.quantity,
                statusId: data.statusId || 1, // Default to status 1 if not provided
            },
        });

        return {
            id: order.id,
        };
    }

    async findAllByUserId(userId: string): Promise<GetOrderResponseDTO[] | null> {
        const orders = await prisma.order.findMany({
            where: {
                userId: userId,
            },
            include: {
                product: {
                    select: {
                        typeProduct: {
                            select: {
                                name: true,
                            }
                        },
                    },
                },
                status: {
                    select: {
                        name: true,
                    },
                },
                Establishment: {
                    select: {
                        name: true,
                    },
                },
            },
        });

        const ordersProduct = await prisma.order.findMany({
            where: {
                userProductId: userId,
            },
            include: {
                product: {
                    select: {
                        typeProduct: {
                            select: {
                                name: true,
                            }
                        },
                    },
                },
                status: {
                    select: {
                        name: true,
                    },
                },
                Establishment: {
                    select: {
                        name: true,
                    },
                },
            },
        });

        orders.push(...ordersProduct);
        if (!orders || orders.length === 0) {
            return [];
        }
        return orders.map(order => ({
            id: order.id,
            productId: order.productId,
            establishmentId: order.establishmentId,
            quantity: order.quantity,
            statusId: order.statusId,
            statusName: order.status.name,
            createdAt: order.createdAt,
            updatedAt: order.updatedAt,
            productName: order.product.typeProduct.name,
            amoutPayment: order.amoutPayment,
            establishmentName: order.Establishment.name,
            userId: order.userId,
            userProductId: order.userProductId,
        }));
    }

    async deleteOrder(orderId: string): Promise<void> {
        const order = await prisma.order.findUnique({
            where: { id: orderId },
        });

        if (!order) {
            throw new Error("Order not found");
        }

        await prisma.order.delete({
            where: { id: orderId },
        });
    }

    async findById(orderId: string): Promise<GetOrderResponseDTO | null> {
        const order = await prisma.order.findUnique({
            where: { id: orderId },
            include: {
                product: {
                    select: {
                        typeProduct: {
                            select: {
                                name: true,
                            }
                        },
                    },
                },
                status: {
                    select: {
                        name: true,
                    },
                },
                Establishment: {
                    select: {
                        name: true,
                    },
                },
            },
        });

        if (!order) {
            return null;
        }

        return {
            id: order.id,
            productId: order.productId,
            establishmentId: order.establishmentId,
            quantity: order.quantity,
            statusId: order.statusId,
            statusName: order.status.name,
            createdAt: order.createdAt,
            updatedAt: order.updatedAt,
            productName: order.product.typeProduct.name,
            amoutPayment: order.amoutPayment,
            establishmentName: order.Establishment.name,
            userId: order.userId,
            userProductId: order.userProductId,
        };
    }

    async cancelOrder(orderId: string): Promise<void> {
        const order = await prisma.order.findUnique({
            where: { id: orderId },
        });

        if (!order) {
            throw new Error("Order not found");
        }

        // Assuming you want to change the status to canceled (statusId 3)
        await prisma.order.update({
            where: { id: orderId },
            data: { statusId: 3, updatedAt: new Date() }, // Assuming 3 is the ID for canceled status
        });
    }

    async makePayment(orderId: string, userId: string): Promise<void> {
        const order = await prisma.order.findUnique({
            where: { id: orderId },
        });

        if (!order) {
            throw new Error("Order not found");
        }

        if (order.userId !== userId) {
            throw new Error("User does not have permission to make payment for this order");
        }
        await prisma.payment.create({
            data: {
                orderId: order.id,
                userId: order.userId,
                amount: order.amoutPayment, // Assuming you want to use the order's amount for
                // payment
            },
        });
        // Assuming you want to change the status to paid (statusId 2)
        await prisma.order.update({
            where: { id: orderId },
            data: { statusId: 2, updatedAt: new Date() }, // Assuming 2 is the ID for paid status
        });


    }
}

export default OrderPrismaRepository;