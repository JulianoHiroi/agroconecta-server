import EstablishmentPrismaRepository from "../../../../infra/repositories/implementations/establishment.prisma.repository";
import OrderPrismaRepository from "../../../../infra/repositories/implementations/order.prisma.repository";
import ProductPrismaRepository from "../../../../infra/repositories/implementations/product.prisma.repository";
import UserPrismaRepository from "../../../../infra/repositories/implementations/user.prisma.repository";
import { CreateOrderDTO, CreateOrderResponseDTO, GetOrderResponseDTO } from "../../@types/orderDTO";
import CancelationOrderUseCase from "../../usecases/cancelationOrder.usecase";
import CreateOrderUseCase from "../../usecases/createOrder.usecase";
import GetAllOrderByUserIdUseCase from "../../usecases/getAllOrderByUserId.usecase";
import OrderService from "../order.service";


class OrderServiceDomain implements OrderService {
  userRepository = new UserPrismaRepository();
  establishmentRepository = new EstablishmentPrismaRepository(); // Assuming establishment repository is similar to user
  productRepository = new ProductPrismaRepository(); // Assuming product repository is similar to user
  orderRepository = new OrderPrismaRepository(); // Assuming order repository is similar to user

  createOrderUseCase = new CreateOrderUseCase(
    this.productRepository,
    this.orderRepository,
    this.userRepository,
    this.establishmentRepository,
  );

  getAllOrderByUserIdUseCase = new GetAllOrderByUserIdUseCase(
    this.orderRepository
  )

  cancelOrderUseCase = new CancelationOrderUseCase(
    this.orderRepository,
  )

  constructor() { }

  async createOrder(data: CreateOrderDTO): Promise<CreateOrderResponseDTO> {
    const order = await this.createOrderUseCase.execute(data);
    return order;
  }
  async findAllByUserId(userId: string): Promise<GetOrderResponseDTO[] | null> {
    const orders = await this.getAllOrderByUserIdUseCase.execute(userId);
    return orders;
  }

  async deleteOrder(orderId: string): Promise<void> {
    await this.orderRepository.deleteOrder(orderId);
  }

  async cancelOrder(orderId: string): Promise<void> {
    await this.cancelOrderUseCase.execute(orderId);
  }

  async makePayment(orderId: string, userId: string): Promise<void> {
    await this.orderRepository.makePayment(orderId, userId);

  }

}
export default OrderServiceDomain;
