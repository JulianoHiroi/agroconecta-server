type nameProductError = "notFound" | "notOwner" | "userAlreadyConnected" | "invalidParams" | "invalidData";
const schemaProductError = {
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
    message: "Invalid data provided for product",
  },
};
class ProductError extends Error {
  public readonly nameError: nameProductError;
  public readonly statusCode: number;
  constructor(nameError: nameProductError) {
    super(schemaProductError[nameError].message);
    this.nameError = nameError;
    this.statusCode = schemaProductError[nameError].statusCode;
  }
}
export default ProductError;