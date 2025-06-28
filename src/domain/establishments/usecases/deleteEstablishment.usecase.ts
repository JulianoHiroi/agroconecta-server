import EstablishmentRepository from "../../../infra/repositories/establishment.repository";
import EstablishmentError from "../error/establishments.error";

class DeleteEstablishmentUseCase {
  constructor(private readonly establishmentRepository: EstablishmentRepository) {}

  async execute(id: string, userId: string): Promise<void> {
    console.log("Executing DeleteEstablishmentUseCase with id:", id, "and userId:", userId);
    const establishmentExists = await this.establishmentRepository.findById(id);
    if (!establishmentExists) {
      throw new EstablishmentError("notFound");
    }
    const establishmentBelongsToUser = await this.establishmentRepository.findAllByUserId(userId);
    if (!establishmentBelongsToUser || !establishmentBelongsToUser.some(est => est.id === id)) {
      throw new EstablishmentError("notFound");
    }

    await this.establishmentRepository.delete(id);
    
    return;
    }
}

export default DeleteEstablishmentUseCase;