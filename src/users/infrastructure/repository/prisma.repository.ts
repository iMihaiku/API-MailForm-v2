import { UserEntity } from "../../domain/user.entity";
import { UserRepository } from "../../domain/user.repository";
import { PrismaClient } from '@prisma/client'

export class PrismaRepository implements UserRepository {
  prisma = new PrismaClient()
  
  async registerUser(userRegister: UserEntity): Promise<void> {
    const userCreated = await this.prisma.user.create({
      data: {
        email: userRegister.email,
        username: userRegister.username,
        password: userRegister.password,
        role: userRegister.role
      }
    })
  }
  async findByEmail(email: string): Promise<any | null> {
    // Prisma logic here
    return null;
  }
  async findById(id: string): Promise<any | null> {
    // Prisma logic here
    return null;
  }
  async updatePassword(user: any): Promise<void> {
    // Prisma logic here
  }
}