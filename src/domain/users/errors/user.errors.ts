type nameUserError =
  | "notFound"
  | "invalidPassword"
  | "invalidEmail"
  | "emptyName"
  | "invalidDateBirth"
  | "emptyGender"
  | "alreadyExists"
  | "invalidToken"
  | "invalidCredentials"
  | "errorCreateCode"
  | "invalidCodeOrEmail";

const schemaError = {
  notFound: {
    statusCode: 404,
    message: "User not found",
  },
  invalidPassword: {
    statusCode: 400,
    message: "Invalid password",
  },
  invalidEmail: {
    statusCode: 400,
    message: "Invalid email",
  },
  emptyName: {
    statusCode: 400,
    message: "Name is required",
  },
  invalidDateBirth: {
    statusCode: 400,
    message: "Invalid date of birth",
  },
  emptyGender: {
    statusCode: 400,
    message: "Gender is required",
  },
  alreadyExists: {
    statusCode: 400,
    message: "User already exists",
  },
  invalidToken: {
    statusCode: 401,
    message: "Invalid token",
  },
  invalidCredentials: {
    statusCode: 401,
    message: "Invalid credentials",
  },
  errorCreateCode: {
    statusCode: 500,
    message: "Error creating recovery code",  
  },
  invalidCodeOrEmail: {
    statusCode: 400,
    message: "Invalid code or email",
  },

};
class UserError extends Error {
  public readonly nameError: nameUserError;
  public readonly statusCode: number;
  
  constructor(nameError: nameUserError) {
    super(schemaError[nameError].message);
    console.log(schemaError[nameError].message);
    this.nameError = nameError;
    this.statusCode = schemaError[nameError].statusCode;
  }
}
export default UserError;
