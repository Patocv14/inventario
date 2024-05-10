import { RegisterUserDto } from "../dto";
import { UserEntity } from "../entities/user.entity";



export abstract class AuthDatasource {

  abstract register(
    registerUserDto: RegisterUserDto,
    accessToken: string
  ): Promise<UserEntity>

}