import { AuthRepository } from "../../repositories";

interface DeleteUser {
  execute(userId: string): Promise<void>;
}

export class DeleteUserUseCase implements DeleteUser {
  constructor(private readonly authRepository: AuthRepository) {}

  async execute(userId: string): Promise<void> {
    await this.authRepository.deleteUser(userId);
  }
}
