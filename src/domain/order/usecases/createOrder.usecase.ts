import ProductRepository from "../../../infra/repositories/product.repository";


type CreateOrderProps = {
  userId: string;
  userProductId: string;
  productId: string;
  establishmentId: string;
  establishmentProductId: string;
  quantity: number;
  statusId?: number; // Default to 1 if not provided
};
type CreateOrderResponse = {
  id: string;
  userId: string;
  userProductId: string;
  productId: string;
  establishmentId: string;
  establishmentProductId: string;
  quantity: number;
  statusId?: number; // Default to 1 if not provided
  createdAt: Date;
  updatedAt: Date;
};
class CreateProductUseCase {
  constructor(
    private productRepository: ProductRepository
  ) {}

  async execute(data: CreateOrderProps): Promise<CreateOrderResponse> {

    const {
      userId,
      userProductId,
      productId,
      establishmentId,
      establishmentProductId,
      quantity,
      statusId = 1, // Default to 1 if not provided
    } = data;

    // Validate required fields
    if (!userId || !productId || !establishmentId || !quantity) {
      throw new Error("Missing required fields");
    }

    // Create the order using the repository
    const order = await this.productRepository.createProduct({
      userId,
      userProductId,
      productId,
      establishmentId,
      establishmentProductId,
      quantity,
      statusId,
    });

    return order;
    
  }
}
export default CreateProductUseCase;
