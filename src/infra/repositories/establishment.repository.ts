import { ConnectImageToEstablishmentsResponseDTO, CreateEstablishmentRequestDTO, CreateEstablishmentResponseDTO, UpdateEstablishmentRequestDTO, UpdateEstablishmentResponseDTO } from "../../domain/establishments/@types/establishmentsDTO";

abstract class EstablishmentRepository {
  abstract create(establishment: CreateEstablishmentRequestDTO): Promise<CreateEstablishmentResponseDTO>;
    abstract connectImageToEstablishment(
        data: { establishmentId: string; imageUrl: string }
    ): Promise<ConnectImageToEstablishmentsResponseDTO>;

    abstract findById(id: string): Promise<CreateEstablishmentResponseDTO | null>;
    abstract update(
        id: string,
        data: UpdateEstablishmentRequestDTO
    ): Promise<UpdateEstablishmentResponseDTO>;

    abstract findAllByUserId(userId: string): Promise<CreateEstablishmentResponseDTO[] | null>;

    abstract delete(id: string): Promise<void>;
} 

export default EstablishmentRepository;