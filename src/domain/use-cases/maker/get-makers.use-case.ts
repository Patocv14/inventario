import { MakerEntity } from "../../entities";
import { MakerRepository } from "../../repositories";


interface GetMakers {
  execute(): Promise<MakerEntity[]>;
}

export class GetMakersUseCase implements GetMakers {
  constructor(
    private readonly makerRepository: MakerRepository
  ) {}

  async execute(): Promise<MakerEntity[]> {
    return await this.makerRepository.getMakers();
  }
}