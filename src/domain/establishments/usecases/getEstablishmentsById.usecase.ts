import EstablishmentRepository from "../../../infra/repositories/establishment.repository";
import { CreateEstablishmentResponseDTO } from "../@types/establishmentsDTO";
import EstablishmentError from "../error/establishments.error";


class GetEstablishmentsByIdUseCase {
  constructor(private readonly establishmentRepository: EstablishmentRepository) {}

  async execute(id: string): Promise<CreateEstablishmentResponseDTO | null> {
    if (!id) throw new EstablishmentError("invalidData");

    const establishment = await this.establishmentRepository.findById(id);
    if (!establishment) throw new EstablishmentError("notFound");

    return establishment;
  }
}