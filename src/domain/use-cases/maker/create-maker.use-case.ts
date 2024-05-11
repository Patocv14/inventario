import { MakerDto } from "../../dto";
import { MakerEntity } from "../../entities";
import { MakerRepository } from "../../repositories";

interface CreateMaker {
  execute(makerDto: MakerDto): Promise<MakerEntity>;
}

export class CreateMakerUseCase implements CreateMaker {
  constructor(private readonly makerRepository: MakerRepository) {}

  async execute(makerDto: MakerDto): Promise<MakerEntity> {
    return await this.makerRepository.createMaker(makerDto);
  }
}
