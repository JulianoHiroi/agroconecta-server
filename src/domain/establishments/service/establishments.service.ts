import { ConnectImageToEstablishmentsRequestDTO, ConnectImageToEstablishmentsResponseDTO, CreateEstablishmentRequestDTO ,CreateEstablishmentResponseDTO, SearchEstablishmentsByFilterRequestDTO, SearchEstablishmentsByFilterResponseDTO, UpdateEstablishmentRequestDTO, UpdateImageProfileToEstablishmentResponseDTO } from "../@types/establishmentsDTO";

abstract class EstablishmentService {
  constructor() {}

  abstract createEstablishment(
    data: CreateEstablishmentRequestDTO,
    userId: string
  ): Promise<CreateEstablishmentResponseDTO>;
  abstract connectImageToEstablishment(
    data: ConnectImageToEstablishmentsRequestDTO
  ): Promise<ConnectImageToEstablishmentsResponseDTO>;

  abstract updateEstablishment(
    data: UpdateEstablishmentRequestDTO,
    userId: string
  ): Promise<CreateEstablishmentResponseDTO>;

  abstract findAllByUserId(
    userId: string
  ): Promise<CreateEstablishmentResponseDTO[] | null>;

  abstract delete(id: string, userId: string): Promise<void>;
  abstract findById(id: string): Promise<CreateEstablishmentResponseDTO | null>;

  abstract updateImageProfile(
    id: string,
    imageProfileUrl: string
  ): Promise<UpdateImageProfileToEstablishmentResponseDTO | null>;

    abstract searchEstablishmentsByFilter(
    filter: SearchEstablishmentsByFilterRequestDTO): Promise<SearchEstablishmentsByFilterResponseDTO[]>;
}
export default EstablishmentService;
