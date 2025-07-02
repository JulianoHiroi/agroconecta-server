type nameEstablishmentError = "notFound" | "invalidData" | "locationNotFound" | "alreadyExists" | "connectionFailed";



;
const schemaEstablishmentError = {
  notFound: {
    statusCode: 404,
    message: "Establishment not found",
  },
  invalidData: {
    statusCode: 400,
    message: "Invalid data provided for establishment",
  }
  ,
  locationNotFound: {
    statusCode: 404,
    message: "Location not found for the provided address",
  },
  alreadyExists: {
    statusCode: 409,
    message: "Establishment already exists",
  },
  connectionFailed: {
    statusCode: 500,
    message: "Failed to connect product to establishment",
  },

};
class EstablishmentError extends Error {
  public readonly nameError: nameEstablishmentError;
  public readonly statusCode: number;
  constructor(nameError: nameEstablishmentError) {
    super(schemaEstablishmentError[nameError].message);
    this.nameError = nameError;
    this.statusCode = schemaEstablishmentError[nameError].statusCode;
  }
}
export default EstablishmentError;
