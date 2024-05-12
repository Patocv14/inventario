import { CategoryRepository } from "../../repositories";


interface DeleteCategory {
  execute(categoryId: string): Promise<void>;
}

export class DeleteCategoryUseCase implements DeleteCategory {
  constructor(private readonly categoryId: CategoryRepository) {}

  async execute(categoryId: string): Promise<void> {
    await this.categoryId.deleteCategory(categoryId);
  }
}