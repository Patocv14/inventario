import { JwtAdapter } from "../../../config";
import { RegisterUserDto } from "../../dto";
import { CustomErrors } from "../../errors/custom.error";
import { AuthRepository } from "../../repositories";

type SignToken = (payload: Object, duration?: string) => Promise<string | null>;

interface User {
  user: {
    id: string;
    name: string;
    email: string;
  };
  accessToken: string;
}

interface IRegisterUserUseCase {
  exectue(registerUserDto: RegisterUserDto): Promise<User>;
}

export class RegisterUserUseCase implements IRegisterUserUseCase {
  constructor(
    private readonly authRepository: AuthRepository,
    private readonly signToken: SignToken = JwtAdapter.generateToken
  ) {}

  async exectue(registerUserDto: RegisterUserDto): Promise<User> {
    const accessToken = await this.signToken(
      { email: registerUserDto.email },
      "30d"
    );
    if (!accessToken) throw CustomErrors.internalServer();
    const user = await this.authRepository.register(
      registerUserDto,
      accessToken
    );
    return {
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
      accessToken,
    };
  }
}
