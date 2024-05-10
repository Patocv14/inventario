import { UpdateUserDto } from "../../dto";
import { AuthRepository } from "../../repositories";


interface User {
  user: {
    id: string;
    name: string;
    email: string;
    address: string | null;
  }
}

interface UpdateUser {
  execute(userId: string, updateUserDto: UpdateUserDto): Promise<User>;
}

export class UpdateUserUseCase implements UpdateUser {
  constructor(
    private readonly authRepository: AuthRepository,
  ) {}

  async execute(userId: string, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.authRepository.updateUser(userId, updateUserDto);
    return {
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        address: user.address,
      }
    }
  }
}