import { RegisterUserDto } from "../dto";
import { UserEntity } from "../entities";


export abstract class AuthRepository {

  abstract register(
    registerUserDto: RegisterUserDto,
    accessToken: string
  ): Promise<UserEntity>

}