import ProductRepository from "../../../infra/repositories/product.repository";
import ProductError from "../error/product.error";
import ProductMapper from "../mappers/product.mapper";

type CreateProductProps = {
  price: number; // Optional, if not provided, it can be handled in the repository
  description: string;
  idTypeProduct: string; // Optional, if not provided, it can be handled in the repository
  userId: string;
};
type CreateProductResponse = {
  id: string;
  price: number; // Optional, if not provided, it can be handled in the repository
  name: string;
  description: string;
  idTypeProduct: string; // Optional, if not provided, it can be handled in the repository
};

class CreateProductUseCase {
  constructor(
    private productRepository: ProductRepository
  ) {}

  async execute(data: CreateProductProps): Promise<CreateProductResponse> {
    if (!data.price || !data.description || !data.userId) {
      throw new ProductError("invalidData");
    }

    if (!data.idTypeProduct) {
      throw new ProductError("invalidData");
    }
    const typeProduct = await this.productRepository.getTypeProducts(data.idTypeProduct);
    console.log(typeProduct);
    if (!typeProduct) {
      throw new ProductError("notFound");
    }


    const product = await this.productRepository.createProduct({
      price: data.price,
      description: data.description,
      idTypeProduct: data.idTypeProduct,
      userId: data.userId,
    });

    return {
      id: product.id,
      price: product.price,
      name: product.name,
      description: product.description,
      idTypeProduct: product.idTypeProduct,
    };
  
  }
}
export default CreateProductUseCase;
