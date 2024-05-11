import { MakerDto } from "../../dto";
import { MakerEntity } from "../../entities";
import { MakerRepository } from "../../repositories";


export class UpdateMakerUseCase {

  constructor(private readonly makerRepository: MakerRepository) {}

  async execute(makerDto: MakerDto, makerId: string): Promise<MakerEntity> {
    return await this.makerRepository.editMaker(makerDto, makerId);
  }

}