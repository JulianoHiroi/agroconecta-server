import { ConnectProductToEstablishmentResponseDTO, ConnectProductToEstablishmentRequestDTO, CreateProductDTO, CreateProductResponseDTO, UpdateProductDTO, UpdateProductResponseDTO } from "../../domain/product/types/productDTO";

abstract class ProductRepository {
    abstract createProduct(data: CreateProductDTO): Promise<CreateProductResponseDTO>;
    abstract getTypeProducts(id: string): Promise<{ id: string; name: string }[]>;
    abstract getAllTypesProducts(): Promise<{ id: string; name: string }[]>;
    abstract updateProduct(data: UpdateProductDTO): Promise<UpdateProductResponseDTO>;  
    abstract findAllByUserId(userId: string): Promise<CreateProductResponseDTO[] | null>;
    abstract findById(id: string): Promise<CreateProductResponseDTO | null>;
    abstract delete(id: string): Promise<void>;
    abstract findAllByEstablishmentId(establishmentId: string): Promise<CreateProductResponseDTO[] | null>;
    abstract connectProductToEstablishment(
         data: ConnectProductToEstablishmentRequestDTO 
    ): Promise<ConnectProductToEstablishmentResponseDTO | null>;

    abstract findConnectionByEstablishmentAndProduct(
        establishmentId: string,
        productId: string
    ): Promise<ConnectProductToEstablishmentResponseDTO | null>;
    abstract deleteConnectionByEstablishmentAndProduct(
        establishmentId: string,
        productId: string
    ): Promise<void>;
}
export default ProductRepository;