import { ConnectImageToEstablishmentsResponseDTO, CreateEstablishmentRequestDTO, CreateEstablishmentResponseDTO } from "../../domain/establishments/@types/establishmentsDTO";

abstract class EstablishmentRepository {
  abstract create(establishment: CreateEstablishmentRequestDTO): Promise<CreateEstablishmentResponseDTO>;
    abstract connectImageToEstablishment(
        data: { establishmentId: string; imageUrl: string },
        userId: string
    ): Promise<ConnectImageToEstablishmentsResponseDTO>;
} 

export default EstablishmentRepository;