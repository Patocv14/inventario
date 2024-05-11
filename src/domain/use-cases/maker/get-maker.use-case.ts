import { MakerDto } from "../../dto";
import { MakerEntity } from "../../entities";
import { MakerRepository } from "../../repositories";


interface GetMaker {
  execute(makerId: string): Promise<MakerEntity>;
}

export class GetMakerUseCase implements GetMaker {
  constructor(
    private readonly makerRepository: MakerRepository
  ) {}

  async execute(makerId: string): Promise<MakerEntity> {
    return await this.makerRepository.getMaker(makerId);
  }
}