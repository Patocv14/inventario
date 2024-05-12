import { CategoryDto } from "../../dto";
import { CategoryEntity } from "../../entities";
import { CategoryRepository } from "../../repositories";

interface CreateCategory {
  execute(categoryDto: CategoryDto): Promise<CategoryEntity>;
}

export class CreateCategoryUseCase implements CreateCategory {
  constructor(private readonly categoryRepository: CategoryRepository) {}

  async execute(categoryDto: CategoryDto): Promise<CategoryEntity> {
    return await this.categoryRepository.createCategory(categoryDto);
  }
}
