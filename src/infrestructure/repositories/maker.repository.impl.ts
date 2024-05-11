import {
  MakerDto,
  MakerDatasource,
  MakerEntity,
  MakerRepository,
} from "../../domain";

export class MakerRepositoryImpl implements MakerRepository {
  constructor(private readonly makerDatasource: MakerDatasource) {}

  createMaker(makerDto: MakerDto): Promise<MakerEntity> {
    return this.makerDatasource.createMaker(makerDto);
  }

  editMaker(makerDto: MakerDto, makerId: string): Promise<MakerEntity> {
    return this.makerDatasource.editMaker(makerDto, makerId);
  }

  deleteMaker(makerId: string): Promise<MakerEntity> {
    return this.makerDatasource.deleteMaker(makerId);
  }

  getMaker(makerId: string): Promise<MakerEntity> {
    return this.makerDatasource.getMaker(makerId);
  }

  getMakers(): Promise<MakerEntity[]> {
    return this.makerDatasource.getMakers();
  }
}
