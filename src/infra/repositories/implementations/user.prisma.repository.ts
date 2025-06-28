import {
  FindUserDTO,
  updateUserDTO,
  RecoverCodeDTO,
} from "../../../domain/users/@types/userDTO";
import UserRepository from "../user.repository";

import { PrismaClient, User } from "@prisma/client";

const prisma = new PrismaClient();

class UserPrismaRepository implements UserRepository {
  async createUser(data: User): Promise<User> {
    const user = await prisma.user.create({ data });
    return user;
  }
  async findUser(findUserDTO: FindUserDTO): Promise<User | null> {
    const user = await prisma.user.findUnique({
      where: {
        email: findUserDTO.email,
        id: findUserDTO.id,
      },
      include: {
        projects: true,
      },
    });
    if (!user) {
      return null;
    }
    return user;
  }
  async deleteUser(id: string): Promise<void> {
    const projects = await prisma.userProject.findMany({
      where: {
        userId: id,
        role: "owner"
      },
    });
    await prisma.userProject.deleteMany({
      where: {
        userId: id,
        role: "owner"
      },
    });
    if(projects && projects.length > 0){
      projects.forEach(async (project) => {
        await prisma.project.delete({
          where: {
            id: project.projectId,
          },
        });
      });
    } 
    await prisma.userProject.deleteMany({
      where: {
        userId: id,
        role: "owner",
      },
    });
    
    
  }
  async updateUser(data: updateUserDTO): Promise<User> {
    const user = await prisma.user.update({
      where: {
        id: data.id,
      },
      data,
    });
    return user;
  }
  async findAll(): Promise<User[]> {
    const users = await prisma.user.findMany({ include: { projects: true } });
    return users;
  }

  async createRecoveryCode(data: RecoverCodeDTO): Promise<string> {
    // Verifica se o código já existe para o email
    const existingCode = await prisma.recoveryPasswordCode.findFirst({
      where: {
        email: data.email,
      },
    });
    // Se já existir, deleta e cria um novo
    if (existingCode) {
      await prisma.recoveryPasswordCode.delete({
        where: {
          id: existingCode.id,
        },
      });
    }
    // Cria o código de recuperação
    const recoveryCode = await prisma.recoveryPasswordCode.create({
      data: {
        email: data.email,
        code: data.code,
        expiresAt: data.expiration,
      },

    });
    return recoveryCode.code;
  }

  async findRecoveryCode(email: string): Promise<RecoverCodeDTO | null> {
    const recoveryCode = await prisma.recoveryPasswordCode.findFirst({
      where: {
        email: email,
      },
    });
    if (!recoveryCode) {
      return null;
    }
    return {
      email: recoveryCode.email,
      code: recoveryCode.code,
      expiration: recoveryCode.expiresAt,
    };
  }
}

export default UserPrismaRepository;
