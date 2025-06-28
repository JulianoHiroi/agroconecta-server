import { User } from "@prisma/client";
import {
  CreateUserDTO,
  FindUserDTO,
  updateUserDTO,
  RecoverCodeDTO,
} from "../../domain/users/@types/userDTO";
abstract class UserRepository {
  abstract findUser(findUserDTO: FindUserDTO): Promise<User | null>;
  abstract createUser(data: CreateUserDTO): Promise<User>;
  abstract deleteUser(id: string): Promise<void>;
  abstract updateUser(data: updateUserDTO): Promise<User>;
  abstract findAll(): Promise<User[]>;
  abstract createRecoveryCode(data: RecoverCodeDTO): Promise<string>;
  abstract findRecoveryCode(email: string): Promise<RecoverCodeDTO | null>;
}

export default UserRepository;
