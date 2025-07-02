import GeoLocationService from "../../../infra/providers/geocoding/geolocation.service";
import EstablishmentRepository from "../../../infra/repositories/establishment.repository";
import UserRepository from "../../../infra/repositories/user.repository";
import UserError from "../../users/errors/user.errors";
import Establishments from "../entity/establishments.entity";
import EstablishmentError from "../error/establishments.error";
import EstablishmentErrorMapper from "../mappers/establishments.mapper";

type CreateEstablishmentProps= {
  name: string;
  logradouro: string;
  number: string;
  CEP: string;
  phone: string;
  description?: string;
  imageProfileUrl?: string;
  userId: string;
};
type CreateEstablishmentResponse = {
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
};

class CreateEstablishmentUseCase {
  constructor(
    private readonly establishmentRepository: EstablishmentRepository,
    private readonly userRepository: UserRepository,
    private geoLocationService : GeoLocationService
  ) {}

  async execute(data: CreateEstablishmentProps): Promise<CreateEstablishmentResponse> {
    const user = await this.userRepository.findUser({ id: data.userId });
    if (!user) {
      throw new UserError("notFound");
    }

    if (!data.name || !data.logradouro || !data.number || !data.CEP || !data.phone) {
      throw new EstablishmentError("invalidData");
    }
    

    const address = `${data.logradouro}, ${data.number}, ${data.CEP}`;
    const coordinates = await this.geoLocationService.getCoordinates(address);
    if (!coordinates) {
      throw new EstablishmentError("locationNotFound");
    }
    console.log("Coordinates:", coordinates);
    const { lat, lng } = coordinates;

    console.log("Creating establishment with coordinates:", lat, lng);




    const establishment = new Establishments({
      name: data.name,
      logradouro: data.logradouro,
      latitue: lat,
      longitude: lng,
      number: data.number,
      CEP: data.CEP,
      phone: data.phone,
      description: data.description,
      userId: user.id,
    });
    
    const establishmentMapped = EstablishmentErrorMapper.toPersist(establishment);
    
    const newEstablishment = await this.establishmentRepository.create(establishmentMapped);
console.log("Establishment entity created:", newEstablishment);
    return newEstablishment;
  }
}
export default CreateEstablishmentUseCase;
