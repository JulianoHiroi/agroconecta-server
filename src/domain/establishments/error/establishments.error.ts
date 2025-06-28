type nameEstablishmentError = "notFound" | "invalidData" | "locationNotFound";



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
