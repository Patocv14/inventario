import { CategoryDto } from "../../dto";
import { CategoryEntity } from "../../entities";
import { CategoryRepository } from "../../repositories";


export class UpdateCategoryUseCase {

  constructor(private readonly categoryRepository: CategoryRepository) {}

  async execute(makerDto: CategoryDto, makerId: string): Promise<CategoryEntity> {
    return await this.categoryRepository.editCategory(makerDto, makerId);
  }

}