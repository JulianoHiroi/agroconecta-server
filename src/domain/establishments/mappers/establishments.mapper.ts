import Establishments from "../entity/establishments.entity";


class EstablishmenMapper {
  static toPersist(establishment: Establishments) {
    return {
      id: establishment.id,
      name: establishment.name,
      logradouro: establishment.logradouro,
      latitue: establishment.latitue,
      longitude: establishment.longitude,
      number: establishment.number,
      CEP: establishment.CEP,
      phone: establishment.phone,
      description: establishment.description,
      userId: establishment.userId,
    };


  }
}
export default EstablishmenMapper;
