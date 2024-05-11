import { PrismaClient } from "@prisma/client";
import {
  MakerDto,
  CustomErrors,
  MakerDatasource,
  MakerEntity,
} from "../../domain";
import { InternalError } from "../../config";

export class MakerDatasourceImpl implements MakerDatasource {
  private prisma = new PrismaClient();

  async createMaker(makerDto: MakerDto): Promise<MakerEntity> {
    try {
      const { name } = makerDto;
      const makerExits = await this.prisma.maker.findUnique({
        where: { name },
      });
      if (makerExits) throw CustomErrors.badRequest("Maker already exists");

      return await this.prisma.maker.create({ data: { name } });
    } catch (error) {
      return InternalError(error);
    }
  }

  async editMaker(makerDto: MakerDto, makerId: string): Promise<MakerEntity> {
    try {
      const { name } = makerDto;
      const makerExits = await this.prisma.maker.findUnique({
        where: { id: makerId },
      });
      if (!makerExits) throw CustomErrors.badRequest("Maker not found");

      if (makerExits.name === name)
        throw CustomErrors.badRequest("Maker already exists");

      const updatedMaker = await this.prisma.maker.update({
        where: { id: makerId },
        data: { name },
      });
      return updatedMaker;
    } catch (error) {
      return InternalError(error);
    }
  }

  async deleteMaker(makerId: string): Promise<MakerEntity> {
    try {
      const makerExits = await this.prisma.maker.findUnique({
        where: { id: makerId },
      });
      if (!makerExits) throw CustomErrors.badRequest("Maker not found");

      const deletedMaker = await this.prisma.maker.delete({
        where: { id: makerId },
      });
      return deletedMaker;
    } catch (error) {
      return InternalError(error);
    }
  }
}
