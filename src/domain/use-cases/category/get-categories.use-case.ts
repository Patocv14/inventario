import { CategoryEntity } from "../../entities";
import { CategoryRepository } from "../../repositories";


interface GetCategories {
  execute(): Promise<CategoryEntity[]>;
}

export class GetCategoriesUseCase implements GetCategories {
  constructor(
    private readonly categoryRepository: CategoryRepository
  ) {}

  async execute(): Promise<CategoryEntity[]> {
    return await this.categoryRepository.getCategories();
  }
}