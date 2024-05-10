import { AuthDatasource, AuthRepository, LoginUserDto, RegisterUserDto, UserEntity } from "../../domain";


export class AuthRepositoryImpl implements AuthRepository {

  constructor(
    private readonly authDatasource: AuthDatasource
  ){}

  register(registerUserDto: RegisterUserDto, accessToken: string): Promise<UserEntity> {
    return this.authDatasource.register(registerUserDto, accessToken);
  }
  login(loginUserDto: LoginUserDto): Promise<UserEntity> {
    return this.authDatasource.login(loginUserDto);
  }
  verifyAccessToken(accessToken: string): Promise<UserEntity> {
    return this.authDatasource.verifyAccessToken(accessToken);
  }
}