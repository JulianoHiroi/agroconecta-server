import ProductRepository from "../../../infra/repositories/product.repository";

type UpdateProductProps = {
    id: string;
    price?: number;
    description?: string;
    idTypeProduct?: string;
}

type UpdateProductResponse = {
    id: string;
    price: number;
    description: string;
    idTypeProduct: string;
    name: string;
}
class UpdateProductUseCase {
  constructor(private productRepository: ProductRepository) {}

  async execute(data: UpdateProductProps): Promise<UpdateProductResponse> {
    const updatedProduct = await this.productRepository.updateProduct(data);
    return updatedProduct;
  }
}

export default UpdateProductUseCase;