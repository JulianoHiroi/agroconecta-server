import ProductRepository from "../../../infra/repositories/product.repository";
import { CreateProductResponseDTO } from "../@types/productsDTO";

class getAllProductsByEstablishmentIdUseCase {
  constructor(private productRepository: ProductRepository) {}

  async execute(establishmentId: string): Promise<CreateProductResponseDTO[]> {
    const products = await this.productRepository.findAllByEstablishmentId(establishmentId);

    if (!products) {
      throw new Error("No products found for this establishment");
    }
    return products;
  }
}



export default getAllProductsByEstablishmentIdUseCase;