import GeoLocationService from "../../../infra/providers/geocoding/geolocation.service";
import EstablishmentRepository from "../../../infra/repositories/establishment.repository";

type UpdateEstablishmentUseCaseRequest = {
    data: {
        id: string;
        name?: string;
        logradouro?: string;
        latitue?: number;
        longitude?: number;
        number?: string;
        CEP?: string;
        phone?: string;
        description?: string;
        userId?: string;
    };
    userId: string;
};

type UpdateEstablishmentUseCaseResponse = {
    id: string;
    name: string;
    logradouro: string;
    latitue: number;
    longitude: number;
    number: string;
    CEP: string;
    phone: string;
    description?: string;
};

class UpdateEstablishmentUseCase {
  constructor(
    private readonly establishmentRepository: EstablishmentRepository,
    private readonly geoLocationService: GeoLocationService,
  ) {}

    async execute(
        request: UpdateEstablishmentUseCaseRequest,
    ): Promise<UpdateEstablishmentUseCaseResponse> {
        const { data, userId } = request;
        const establishmentExists = await this.establishmentRepository.findById(data.id);
        if (!establishmentExists) {
            throw new Error("Establishment not found");
        }
        // Verifica se há a propriedade na requisição se não utiliza o existente

        if (!data.name || !data.logradouro || !data.number || !data.CEP || !data.phone) {
            throw new Error("Invalid data provided for establishment");
        }
        const address = `${data.logradouro || establishmentExists.logradouro}, ${data.number || establishmentExists.number}, ${data.CEP || establishmentExists.CEP}`;
        const coordinates = await this.geoLocationService.getCoordinates(address);
        if (!coordinates) {
            throw new Error("Location not found for the provided address");
        }
        const { lat, lng } = coordinates;
        console.log("Updating establishment with coordinates:", lat, lng);
        const updatedEstablishment = await this.establishmentRepository.update(
            data.id,
            {
                name: data.name || establishmentExists.name,
                logradouro: data.logradouro || establishmentExists.logradouro,
                latitue: data.latitue ?? lat,
                longitude: data.longitude ?? lng,
                number: data.number || establishmentExists.number,
                CEP: data.CEP || establishmentExists.CEP,
                phone: data.phone || establishmentExists.phone,
                description: data.description ?? establishmentExists.description,
                id: ""
            },
        );
        return {
            id: updatedEstablishment.id,
            name: updatedEstablishment.name,
            logradouro: updatedEstablishment.logradouro,
            latitue: updatedEstablishment.latitue,
            longitude: updatedEstablishment.longitude,
            number: updatedEstablishment.number,
            CEP: updatedEstablishment.CEP,
            phone: updatedEstablishment.phone,
            description: updatedEstablishment.description ?? undefined,
        };

    
       

    }
}

export default UpdateEstablishmentUseCase;