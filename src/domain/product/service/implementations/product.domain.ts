import ProductPrismaRepository from "../../../../infra/repositories/implementations/product.prisma.repository";
import ProductRepository from "../../../../infra/repositories/product.repository";
import { ConnectProductToEstablishmentRequestDTO, ConnectProductToEstablishmentResponseDTO, CreateProductDTO, CreateProductResponseDTO, UpdateProductDTO, UpdateProductResponseDTO } from "../../@types/productsDTO";
import CreateProductUseCase from "../../usecases/createProduct.usecase";
import UpdateProductUseCase from "../../usecases/updateProduct.usecase";
import GetAllProductsByEstablishmentIdUseCase from "../../usecases/getAllProductsByEstablishmentId.usecase";
import ProductService from "../product.service";
import DeleteProductUseCase from "../../usecases/deleteProduct.usecase";
import EstablishmentPrismaRepository from "../../../../infra/repositories/implementations/establishment.prisma.repository";
import ConnectProductToEstablishmentUseCase from "../../usecases/connectProductToEstablishment.usecase";

class ProductServiceDomain implements ProductService {
 
  productRepository = new ProductPrismaRepository(); // Assuming you have a ProductRepository similar to the one in the original code
  establishmentRepository = new EstablishmentPrismaRepository(); // Assuming you have an EstablishmentRepository similar to the one in the original code
  createProductUseCase = new CreateProductUseCase(
    this.productRepository
  );

  updateProductUseCase = new UpdateProductUseCase(
    this.productRepository
  )

  getAllProductsByEstablishmentIdUseCase = new GetAllProductsByEstablishmentIdUseCase(
    this.productRepository
  );

  deleteProductUseCase = new DeleteProductUseCase(
    this.productRepository
  );

  connectProductToEstablishmentUseCase = new ConnectProductToEstablishmentUseCase(
    this.productRepository
  , this.establishmentRepository
  )

  constructor() {}

  async createProduct(
    data: CreateProductDTO
  ): Promise<CreateProductResponseDTO> {
    const project = await this.createProductUseCase.execute({
     ...data,

    });
    return project;
  }
  
  async getTypesProducts(): Promise<{ id: string; name: string }[]> {
    const typesProducts = await this.productRepository.getAllTypesProducts();
    return typesProducts;
  }

  async updateProduct(
    data: UpdateProductDTO
  ): Promise<UpdateProductResponseDTO> {
    const updatedProduct = await this.updateProductUseCase.execute
    ({
      id: data.id,
      price: data.price,
      description: data.description,
      idTypeProduct: data.idTypeProduct,
    });
    return updatedProduct;
  }
  
  async getAllProductsByEstablishmentId(
    establishmentId: string
  ): Promise<CreateProductResponseDTO[]> {
    const products = await this.getAllProductsByEstablishmentIdUseCase.execute(establishmentId);
    return products;
  }

  async findAllByUserId(
    userId: string
  ): Promise<CreateProductResponseDTO[] | null> {
    const products = await this.productRepository.findAllByUserId(userId);
    return products;
  }
  async findById(id: string): Promise<CreateProductResponseDTO | null> {
    const product = await this.productRepository.findById(id);
    return product;
  }
  async delete(id: string, userId: string): Promise<void> {
    await this.deleteProductUseCase.execute(id, userId);
  }
  async findAllByEstablishmentId(
    establishmentId: string
  ): Promise<CreateProductResponseDTO[] | null> {
    const products = await this.productRepository.findAllByEstablishmentId(establishmentId);
    return products;
  }

  async connectProductToEstablishment(
    data: ConnectProductToEstablishmentRequestDTO
  ): Promise<ConnectProductToEstablishmentResponseDTO> {
    const connection = await this.connectProductToEstablishmentUseCase.execute(data);
    return {
      id: connection.id,
      establishmentId: connection.idEstablishment,
      productId: connection.idProduct,
      quantity: connection.quantity,
    }
  }

  async deleteConnectionProductToEstablishment(
    establishmentId: string,
    productId: string
  ): Promise<void> {
    const connection = await this.productRepository.findConnectionByEstablishmentAndProduct(establishmentId, productId);
    if (!connection) {
      throw new Error("Connection not found");
    }
    await this.productRepository.deleteConnectionByEstablishmentAndProduct(
      establishmentId,
      productId
    );
  }
}
export default ProductServiceDomain;
