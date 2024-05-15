import { UserEntity } from "./user.entity";

export interface UserRepository {
  registerUser(user: UserEntity): Promise<void>;
  findByEmail(email: string): Promise<UserEntity | null>;
  findById(id: string): Promise<UserEntity | null>;
  updatePassword(user: UserEntity): Promise<void>;
}