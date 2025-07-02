import OrderRepository from "../../../infra/repositories/order.repository";

class GetAllOrderByUserIdUseCase {
    constructor(private readonly orderRepository: OrderRepository) { }

    async execute(userId: string) {
        if (!userId) {
            throw new Error("User ID is required");
        }

        const orders = await this.orderRepository.findAllByUserId(userId);
        return orders;
    }
}

export default GetAllOrderByUserIdUseCase;