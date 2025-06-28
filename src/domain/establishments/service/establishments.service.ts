import { CreateEstablishmentRequestDTO ,CreateEstablishmentResponseDTO } from "../@types/establishmentsDTO";

abstract class EstablishmentService {
  constructor() {}

  abstract createEstablishment(
    data: CreateEstablishmentRequestDTO,
    userId: string
  ): Promise<CreateEstablishmentResponseDTO>;
}
export default EstablishmentService;
