import { AuthRepository } from "../../repositories";

interface VerifyToken {
  execute(token: string): Promise<boolean>
}

export class VerifyTokenUseCase implements VerifyToken {

  constructor(
    private readonly authRepository: AuthRepository,
  ){}

  async execute(token: string): Promise<boolean> {
    const user = await this.authRepository.verifyAccessToken(token);
    if(!user) return false;
    return true;
  }

}