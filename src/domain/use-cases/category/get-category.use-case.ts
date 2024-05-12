import { CategoryEntity } from "../../entities";
import { CategoryRepository } from "../../repositories";


interface GetCategory {
  execute(makerId: string): Promise<CategoryEntity>;
}

export class GetCategoryUseCase implements GetCategory {
  constructor(
    private readonly categoryRepository: CategoryRepository
  ) {}

  async execute(categoryId: string): Promise<CategoryEntity> {
    return await this.categoryRepository.getCategory(categoryId);
  }
}