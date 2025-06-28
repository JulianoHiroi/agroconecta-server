type nameEstablishmentError = "notFound" ;
const schemaEstablishmentError = {
  notFound: {
    statusCode: 404,
    message: "Establishment not found",
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
