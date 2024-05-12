

import { CategoryDto } from "../dto";
import { CategoryEntity } from "../entities";

export abstract class CategoryDatasource {
  abstract createCategory(makerDto: CategoryDto): Promise<CategoryEntity>;
  abstract editCategory(makerDto: CategoryDto, makerId: string): Promise<CategoryEntity>;
  abstract deleteCategory(makerId: string): Promise<CategoryEntity>;
  abstract getCategory(makerId: string): Promise<CategoryEntity>;
  abstract getCategories(): Promise<CategoryEntity[]>;
}
