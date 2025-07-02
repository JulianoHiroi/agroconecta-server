import { CreateOrderDTO, CreateOrderResponseDTO, GetOrderResponseDTO } from "../@types/orderDTO";


abstract class OrderService {
  constructor() { }

  abstract createOrder(
    data: CreateOrderDTO
  ): Promise<CreateOrderResponseDTO>;

  abstract findAllByUserId(
    userId: string
  ): Promise<GetOrderResponseDTO[] | null>;

  abstract deleteOrder(
    orderId: string
  ): Promise<void>;

  abstract cancelOrder(
    orderId: string
  ): Promise<void>;

  abstract makePayment(
    orderId: string,
    userId: string
  ): Promise<void>;

}
export default OrderService;
