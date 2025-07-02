import { SearchEstablishmentsByFilterRequestDTO, SearchEstablishmentsByFilterResponseDTO } from "../../establishments/@types/establishmentsDTO";
import { ConnectProductToEstablishmentRequestDTO, ConnectProductToEstablishmentResponseDTO, CreateProductDTO, CreateProductResponseDTO, UpdateProductDTO } from "../@types/productsDTO";


abstract class ProductService {
  constructor() { }

  abstract createProduct(
    data: CreateProductDTO
  ): Promise<CreateProductResponseDTO>;

  abstract getTypesProducts(): Promise<{ id: string; name: string }[]>;

  abstract updateProduct(
    data: UpdateProductDTO
  ): Promise<CreateProductResponseDTO>;

  abstract findAllByUserId(
    userId: string
  ): Promise<CreateProductResponseDTO[] | null>;
  abstract findById(id: string): Promise<CreateProductResponseDTO | null>;
  abstract delete(id: string, userId: string): Promise<void>;
  abstract findAllByEstablishmentId(
    establishmentId: string
  ): Promise<CreateProductResponseDTO[] | null>;
  abstract connectProductToEstablishment(
    data: ConnectProductToEstablishmentRequestDTO
  ): Promise<ConnectProductToEstablishmentResponseDTO | null>;

  abstract deleteConnectionProductToEstablishment(
    establishmentId: string,
    productId: string
  ): Promise<void>;

  abstract makeAvaliation(
    productId: string,
    userId: string,
    rating: number,
  ): Promise<void>;
}
export default ProductService;
