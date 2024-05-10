import { LoginUserDto } from "../../dto";
import { CustomErrors } from "../../errors/custom.error";
import { AuthRepository } from "../../repositories";

interface User {
  user: {
    id: string;
    email: string;
    role: string;
    address: string | null;
    accessToken: string;
  };
}

interface LoginUser {
  exectute(loginUserDto: LoginUserDto): Promise<User>
}

export class LoginUserUseCase implements LoginUser {

  constructor(
    private readonly authRepository: AuthRepository,
  ){}

  async exectute(loginUserDto: LoginUserDto): Promise<User> {

    const user = await this.authRepository.login(loginUserDto);
    if(!user) throw CustomErrors.unauthorized('Invalid email or password');

    return {
      user: {
        id: user.id,
        email: user.email,
        role: user.role!,
        address: user.address,
        accessToken: user.token!
      }, 
    }
  }
}