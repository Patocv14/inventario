import { LoginUserDto, RegisterUserDto } from "../dto";
import { UserEntity } from "../entities";

export abstract class AuthDatasource {
  abstract register(
    registerUserDto: RegisterUserDto,
    accessToken: string
  ): Promise<UserEntity>;

  abstract login(
    loginUserDto: LoginUserDto,
    accessToken: string
  ): Promise<UserEntity>;
}
