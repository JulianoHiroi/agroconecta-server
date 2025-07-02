import EstablishmentRepository from "../../../infra/repositories/establishment.repository";
import { ConnectImageToEstablishmentsRequestDTO, ConnectImageToEstablishmentsResponseDTO } from "../@types/establishmentsDTO";
import EstablishmentError from "../error/establishments.error";

class ConnectImageToEstablishmentsUseCase {

    constructor(private establishmentRepository: EstablishmentRepository) {}

  async execute(
    data: ConnectImageToEstablishmentsRequestDTO,
    userId: string
  ): Promise<ConnectImageToEstablishmentsResponseDTO> {

    const establishmentExists = await this.establishmentRepository.findById(data.establishmentId);
    if (!establishmentExists) {
        throw new EstablishmentError("notFound");
    }     

    if (!data.urlImage) {
      throw new EstablishmentError("invalidData");
    }
    console.log("Connecting image to establishment with ID:", data.establishmentId, "and URL:", data.urlImage);
    const establishment = await this.establishmentRepository.connectImageToEstablishment(
      {
        establishmentId: data.establishmentId,
        imageUrl: data.urlImage,
      },
    );
    return establishment;
  }
}