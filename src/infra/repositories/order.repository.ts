import GetAllEstablishmentsByUserIdUseCase from "../../domain/establishments/usecases/getAllEstablishmentsByUserId.usecase";
import { CreateOrderDTO, CreateOrderResponseDTO, GetOrderResponseDTO } from "../../domain/order/@types/orderDTO";


abstract class OrderRepository {
    abstract createOrder(data: CreateOrderDTO): Promise<CreateOrderResponseDTO>;
    abstract findAllByUserId(userId: string): Promise<GetOrderResponseDTO[] | null>;
    abstract deleteOrder(orderId: string): Promise<void>;
    abstract findById(id: string): Promise<GetOrderResponseDTO | null>;
    abstract cancelOrder(orderId: string): Promise<void>;
    abstract makePayment(orderId: string, userId: string): Promise<void>;

}
export default OrderRepository;