import {
  CategoryDto,
  CategoryDatasource,
  CategoryEntity,
  CategoryRepository,
} from "../../domain";

export class CategoryRepositoryImpl implements CategoryRepository {
  constructor(private readonly categoryRepository: CategoryDatasource) {}

  createCategory(categoryDto: CategoryDto): Promise<CategoryEntity> {
    return this.categoryRepository.createCategory(categoryDto);
  }

  editCategory(categoryDto: CategoryDto, makerId: string): Promise<CategoryEntity> {
    return this.categoryRepository.editCategory(categoryDto, makerId);
  }

  deleteCategory(makerId: string): Promise<CategoryEntity> {
    return this.categoryRepository.deleteCategory(makerId);
  }

  getCategory(makerId: string): Promise<CategoryEntity> {
    return this.categoryRepository.getCategory(makerId);
  }

  getCategories(): Promise<CategoryEntity[]> {
    return this.categoryRepository.getCategories();
  }
}
