import ProductRepository from "../../../infra/repositories/product.repository";
import ProductError from "../error/product.error";

class DeleteProductUseCase {
  constructor(private productRepository: ProductRepository) {}

  async execute(productId: string , userId: string): Promise<void> {
    // Validate if the product exists

    if (!productId) {
      throw new ProductError("invalidData");
    }
    if (!userId) {
       throw new ProductError("invalidData");
    }

    //verifica se o produto pertence ao usuárip
    
    const productsUser = await this.productRepository.findAllByUserId(userId);
    if (!productsUser || !productsUser.some(product => product.id === productId)) {
      throw new ProductError("notFound");
    }

    // Delete the product
    await this.productRepository.delete(productId);
  }
}

export default DeleteProductUseCase;