import { PrismaClient } from "@prisma/client";
import {
  CategoryDto,
  CustomErrors,
  CategoryDatasource,
  CategoryEntity,
} from "../../domain";
import { InternalError } from "../../config";

export class CategoryDatasourceImpl implements CategoryDatasource {
  private prisma = new PrismaClient();

  async createCategory(categoryDto: CategoryDto): Promise<CategoryEntity> {
    try {
      const { name } = categoryDto;
      const categoryExits = await this.prisma.category.findUnique({
        where: { name },
      });
      if (categoryExits) throw CustomErrors.badRequest("Category already exists");

      return await this.prisma.category.create({ data: { name } });
    } catch (error) {
      return InternalError(error);
    }
  }

  async editCategory(categoryDto: CategoryDto, categoryId: string): Promise<CategoryEntity> {
    try {
      const { name } = categoryDto;
      const categoryExits = await this.prisma.category.findUnique({
        where: { id: categoryId },
      });
      if (!categoryExits) throw CustomErrors.badRequest("Category not found");

      if (categoryExits.name === name)
        throw CustomErrors.badRequest("Maker already exists");

      const updatedCategory = await this.prisma.category.update({
        where: { id: categoryId },
        data: { name },
      });
      return updatedCategory;
    } catch (error) {
      return InternalError(error);
    }
  }

  async deleteCategory(makerId: string): Promise<CategoryEntity> {
    try {
      const categoryExits = await this.prisma.category.findUnique({
        where: { id: makerId },
      });
      if (!categoryExits) throw CustomErrors.badRequest("Category not found");

      const deletedCategory = await this.prisma.category.delete({
        where: { id: makerId },
      });
      return deletedCategory;
    } catch (error) {
      return InternalError(error);
    }
  }

  async getCategory(makerId: string): Promise<CategoryEntity> {
    try {
      const category = await this.prisma.category.findUnique({
        where: { id: makerId },
      });
      if (!category) throw CustomErrors.badRequest("Maker not found");
      return category;
    } catch (error) {
      return InternalError(error);
    }
  }

  async getCategories(): Promise<CategoryEntity[]> {
    try {
      return await this.prisma.category.findMany();
    } catch (error) {
      return InternalError(error);
    }
  }
}
