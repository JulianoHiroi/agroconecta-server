import Establishments from "../entity/establishments.entity";


class EstablishmentErrorMapper {
  static toPersist(establishment: Establishments) {
    return {
      id: establishment.id,
      name: establishment.name,
      logradouro: establishment.logradouro,
      number: establishment.number,
      CEP: establishment.CEP,
      phone: establishment.phone,
      description: establishment.description,
      userId: establishment.userId,
    };


  }
}
export default EstablishmentErrorMapper;
