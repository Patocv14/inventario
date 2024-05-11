import { MakerRepository } from "../../repositories";


interface DeleteMaker {
  execute(makerId: string): Promise<void>;
}

export class DeleteMakerUseCase implements DeleteMaker {
  constructor(private readonly makerRepository: MakerRepository) {}

  async execute(makerId: string): Promise<void> {
    await this.makerRepository.deleteMaker(makerId);
  }
}