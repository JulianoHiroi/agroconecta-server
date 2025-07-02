import EstablishmentRepository from "../../../infra/repositories/establishment.repository";
import EstablishmentError from "../error/establishments.error";

type GetAllEstablishmentsByUserIdUseCaseProps = {
  userId: string;
};

type GetAllEstablishmentsByUserIdResponseDTO = {
    id: string;
    name: string;
    logradouro: string;
    latitue: number;
    longitude: number;
    number: string;
    CEP: string;
    phone: string;
    description?: string;
    imageProfileUrl?: string;
    images?: {
        id: string;
        url: string;
    }[]
} [];


class GetAllEstablishmentsByUserIdUseCase {
    constructor(
        private readonly establishmentRepository: EstablishmentRepository
    ) {}
    
    async execute(
        data: GetAllEstablishmentsByUserIdUseCaseProps
    ): Promise<GetAllEstablishmentsByUserIdResponseDTO> {
        const establishments = await this.establishmentRepository.findAllByUserId(data.userId);
        
        if (!establishments || establishments.length === 0) {
        throw new EstablishmentError("notFound");
        }
    
        return establishments.map(establishment => ({
        id: establishment.id,
        name: establishment.name,
        logradouro: establishment.logradouro,
        latitue: establishment.latitue,
        longitude: establishment.longitude,
        imageProfileUrl: establishment.imageProfileUrl ?? undefined,
        number: establishment.number,
        CEP: establishment.CEP,
        phone: establishment.phone,
        description: establishment.description ?? undefined,
        }));
    }
}

export default GetAllEstablishmentsByUserIdUseCase;