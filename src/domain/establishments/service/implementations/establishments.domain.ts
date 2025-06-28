
import EstablishmentPrismaRepository from "../../../../infra/repositories/implementations/establishment.prisma.repository";
import UserPrismaRepository from "../../../../infra/repositories/implementations/user.prisma.repository";
import { CreateEstablishmentRequestDTO, CreateEstablishmentResponseDTO } from "../../@types/establishmentsDTO";
import CreateEstablishmentUseCase from "../../usecases/createEstablishments.usecase";
import EstablishmentService from "../establishments.service";

class EstablishmentServiceDomain implements EstablishmentService {
  establishmentRepository = new EstablishmentPrismaRepository();
  userRepository = new UserPrismaRepository(); // Assuming user repository is similar to establishment

  createEstablishmentUseCase = new CreateEstablishmentUseCase(
    this.establishmentRepository,
    this.userRepository
  );

  constructor() {}

  async createEstablishment(
    data: CreateEstablishmentRequestDTO,
    userId: string
  ): Promise<CreateEstablishmentResponseDTO> {
    const establishment = await this.createEstablishmentUseCase.execute({
      ...data,
      userId,
    });
    return establishment;
  }

}
export default EstablishmentServiceDomain;
