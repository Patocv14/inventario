import { LoginUserDto, RegisterUserDto, UpdateUserDto } from "../dto";
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

  abstract deleteUser(
    userId: string
  ): Promise<void>;

  abstract updateUser(
    userId: string,
    updateUserDto: UpdateUserDto
  ): Promise<UserEntity>;

  abstract getUser(
    userId: string
  ): Promise<UserEntity>;

  abstract getUsers(): Promise<UserEntity[]>;
  
}
