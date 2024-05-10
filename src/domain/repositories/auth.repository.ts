import { LoginUserDto, RegisterUserDto } from "../dto";
import { UserEntity } from "../entities";

export abstract class AuthRepository {
  abstract register(
    registerUserDto: RegisterUserDto,
    accessToken: string
  ): Promise<UserEntity>;

  abstract login(
    loginUserDto: LoginUserDto
  ): Promise<UserEntity>;
  
  abstract verifyAccessToken(
    accessToken: string
  ): Promise<UserEntity>;

  
}
