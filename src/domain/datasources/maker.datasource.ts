import { MakerDto } from "../dto";
import { MakerEntity } from "../entities";

export abstract class MakerDatasource {
  abstract createMaker(makerDto: MakerDto): Promise<MakerEntity>;
  abstract editMaker(makerDto: MakerDto, makerId: string): Promise<MakerEntity>;
  abstract deleteMaker(makerId: string): Promise<MakerEntity>;
}
