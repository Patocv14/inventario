import { AuthRepository } from "../../repositories";
import { UserMapper } from "../../../infrestructure";
import { UserEntity } from "../../entities";
import { CustomErrors } from "../../errors/custom.error";

interface VerifyToken {
  execute(token: string): Promise<UserEntity>
}

export class VerifyTokenUseCase implements VerifyToken {

  constructor(
    private readonly authRepository: AuthRepository,
  ){}

  async execute(token: string): Promise<UserEntity> {
    const user = await this.authRepository.verifyAccessToken(token);
    if(!user) throw CustomErrors.badRequest("Invalid token");
    return UserMapper.userEntityFromObject(user);
  }

}