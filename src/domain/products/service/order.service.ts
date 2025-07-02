import { CreateOrderDTO, CreateOrderResponseDTO } from "../@types/orderDTO";


abstract class OrderService {
  constructor() {}

  abstract createOrder(
    data: CreateOrderDTO
  ): Promise<CreateOrderResponseDTO>;


}
export default OrderService;
