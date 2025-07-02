type nameOrderError = "notFound" | "notOwner" | "userAlreadyConnected" | "invalidParams" | "invalidData";
const schemaOrderError = {
  notFound: {
    statusCode: 404,
    message: "Project not found",
  },
  notOwner: {
    statusCode: 401,
    message: "You are not the owner of this project",
  },
  userAlreadyConnected: {
    statusCode: 400,
    message: "User already connected to this project",
  }, 
  invalidParams: {
    statusCode: 400,
    message: "Invalid params",
  }
  ,
  invalidData: {
    statusCode: 400,
    message: "Invalid data provided for Order",
  },
};
class OrderError extends Error {
  public readonly nameError: nameOrderError;
  public readonly statusCode: number;
  constructor(nameError: nameOrderError) {
    super(schemaOrderError[nameError].message);
    this.nameError = nameError;
    this.statusCode = schemaOrderError[nameError].statusCode;
  }
}
export default OrderError;