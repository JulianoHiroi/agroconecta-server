import { CreateOrderDTO, CreateOrderResponseDTO } from "../../domain/order/@types/orderDTO";


abstract class OrderRepository {
    abstract createOrder(data: CreateOrderDTO): Promise<CreateOrderResponseDTO>;
    
}
export default OrderRepository;