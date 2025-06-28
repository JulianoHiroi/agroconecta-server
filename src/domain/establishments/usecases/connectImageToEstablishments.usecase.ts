import EstablishmentRepository from "../../../infra/repositories/establishment.repository";
import { ConnectImageToEstablishmentsRequestDTO, ConnectImageToEstablishmentsResponseDTO } from "../@types/establishmentsDTO";

class ConnectImageToEstablishmentsUseCase {

    constructor(private establishmentRepository: EstablishmentRepository) {}

  async execute(
    data: ConnectImageToEstablishmentsRequestDTO,
    userId: string
  ): Promise<ConnectImageToEstablishmentsResponseDTO> {
    const establishment = await this.establishmentRepository.connectImageToEstablishment(
      {
        establishmentId: data.establishmentId,
        imageUrl: data.urlImage,
      },
      userId
    );
    return establishment;
  }
}