import OrderRepository from "../../../infra/repositories/order.repository";

class CancelationOrderUseCase {
    constructor(private orderRepository: OrderRepository) { }

    async execute(orderId: string): Promise<void> {
        // Validate the order ID
        if (!orderId) {
            throw new Error("Order ID is required");
        }
        // Check if the order exists
        await this.orderRepository.cancelOrder(orderId);


    }
}

export default CancelationOrderUseCase;