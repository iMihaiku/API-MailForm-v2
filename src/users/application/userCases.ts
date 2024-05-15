import { UserEntity } from "../domain/user.entity"
import { UserRepository } from "../domain/user.repository"
import { UserValue } from "../domain/user.value"

export class UserCases{

    constructor(private userRepository: UserRepository){
      
    }
    public async registerUser({ username, email, password} : {username: string, email: string, password: string}): Promise<void>{
        const userValue = new UserValue({ username, email, password})
        return await this.userRepository.registerUser(userValue)
    }
    public async findByEmail(email: string): Promise<UserEntity | null>{
        return await this.userRepository.findByEmail(email)
    }
    public async findById(id: string): Promise<UserEntity | null>{
        return await this.userRepository.findById(id)
    }
    public async updatePassword(user: UserEntity): Promise<void>{
        return await this.userRepository.updatePassword(user)
    }
}