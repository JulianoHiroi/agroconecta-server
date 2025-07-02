import EstablishmentRepository from "../../../infra/repositories/establishment.repository";
import OrderRepository from "../../../infra/repositories/order.repository";
import ProductRepository from "../../../infra/repositories/product.repository";
import UserRepository from "../../../infra/repositories/user.repository";
import EstablishmentError from "../../establishments/error/establishments.error";
import ProductError from "../../product/error/product.error";
import UserError from "../../users/errors/user.errors";


type CreateOrderProps = {
  userId: string;
  productId: string;
  establishmentId: string;
  quantity: number;
  statusId?: number; // Default to 1 if not provided
};
type CreateOrderResponse = {
  id: string;
};
class CreateOrderUseCase {
  constructor(
    private productRepository: ProductRepository,
    private orderRepository: OrderRepository,
    private userRepository: UserRepository,
    private establishmentRepository: EstablishmentRepository
  ) { }

  async execute(data: CreateOrderProps): Promise<CreateOrderResponse> {
    if (!data.userId || !data.productId || !data.establishmentId) {
      throw new Error("User ID, Product ID, and Establishment ID are required.");
    }
    // Validate user
    const user = await this.userRepository.findUser({ id: data.userId });

    if (!user) {
      throw new UserError("notFound");
    }


    // Check if the product exists in the establishment
    const establishmentProduct = await this.productRepository.findConnectionByEstablishmentAndProduct(
      data.establishmentId,
      data.productId
    );
    console.log("establishmentProduct", establishmentProduct);
    if (!establishmentProduct) {
      throw new ProductError("notFound");
    }

    // cria o order 
    const orderData = {
      userId: data.userId,
      productId: data.productId,
      establishmentId: data.establishmentId,
      establishmentProductId: establishmentProduct.id,
      quantity: data.quantity,
      statusId: data.statusId || 1, // Default to status 1 if not provided
    };
    const order = await this.orderRepository.createOrder(orderData);

    if (!order) {
      throw new Error("Failed to create order");
    }

    return {
      id: order.id,
    };
  }
}
export default CreateOrderUseCase;
