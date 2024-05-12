import { Response, Request } from "express";
import {
  CategoryDto,
  CategoryRepository,
  CategoryEntity,
  UpdateCategoryUseCase,
  CreateCategoryUseCase,
  DeleteCategoryUseCase,
  GetCategoryUseCase,
  GetCategoriesUseCase
} from "../../domain";

import { handleError } from "../../config";

export class CategoryController {
  constructor(private readonly categoryRepository: CategoryRepository) {}

  createCategory = (req: Request, res: Response) => {
    const [error, categoryDto] = CategoryDto.create(req.body);
    if (error) return handleError(error, res);

    new CreateCategoryUseCase(this.categoryRepository)
      .execute(categoryDto!)
      .then((data) => res.json(data))
      .catch((error) => handleError(error, res));
  }

  updateCategory = (req: Request, res: Response) => {
    const [error, categoryDto] = CategoryDto.create(req.body);
    if (error) return handleError(error, res);

    new UpdateCategoryUseCase(this.categoryRepository)
      .execute(categoryDto!, req.params.id)
      .then((data) => res.json(data))
      .catch((error) => handleError(error, res));
  }

  deleteCategory = (req: Request, res: Response) => {
    new DeleteCategoryUseCase(this.categoryRepository)
      .execute(req.params.id)
      .then(() => res.json())
      .catch((error) => handleError(error, res));
  }

  getCategory = (req: Request, res: Response) => {
    new GetCategoryUseCase(this.categoryRepository)
      .execute(req.params.id)
      .then((data) => res.json(data))
      .catch((error) => handleError(error, res));
  }

  getCategories = (req: Request, res: Response) => {
    new GetCategoriesUseCase(this.categoryRepository)
      .execute()
      .then((data) => res.json(data))
      .catch((error) => handleError(error, res));
  }


}
