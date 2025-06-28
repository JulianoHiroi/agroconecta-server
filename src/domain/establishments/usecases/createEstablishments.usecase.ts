import EstablishmentRepository from "../../../infra/repositories/establishment.repository";
import UserRepository from "../../../infra/repositories/user.repository";
import UserError from "../../users/errors/user.errors";
import Establishments from "../entity/establishments.entity";
import EstablishmentErrorMapper from "../mappers/establishments.mapper";

type CreateEstablishmentProps= {
  name: string;
  logradouro: string;
  number: string;
  CEP: string;
  phone: string;
  description?: string;
  userId: string;
};
type CreateEstablishmentResponse = {
  id: string;
  name: string;
  logradouro: string;
  number: string;
  CEP: string;
  phone: string;
  description?: string;
};

class CreateEstablishmentUseCase {
  constructor(
    private readonly establishmentRepository: EstablishmentRepository,
    private readonly userRepository: UserRepository
  ) {}

  async execute(data: CreateEstablishmentProps): Promise<CreateEstablishmentResponse> {
    const user = await this.userRepository.findUser({ id: data.userId });
    if (!user) {
      throw new UserError("notFound");
    }

    const establishment = new Establishments({
      name: data.name,
      logradouro: data.logradouro,
      number: data.number,
      CEP: data.CEP,
      phone: data.phone,
      description: data.description,
      userId: user.id,
    });
    const establishmentMapped = EstablishmentErrorMapper.toPersist(establishment);
    const newEstablishment = await this.establishmentRepository.create(establishmentMapped);

    return newEstablishment;
  }
}
export default CreateEstablishmentUseCase;
