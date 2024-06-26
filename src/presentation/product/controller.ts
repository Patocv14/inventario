import { Request, Response } from "express";
import {
  CreateProductUseCase,
  DeleteProductUseCase,
  GetCategoriesUseCase,
  GetProductByCategoryUseCase,
  GetProductUseCase,
  GetProductsUseCase,
  ProductDto,
  ProductRepository,
  UpdateProductUseCase,
} from "../../domain";
import { handleError } from "../../config";

export class ProductController {
  constructor(private productRepository: ProductRepository) {}

  createProduct = (req: Request, res: Response) => {
    const [error, productDto] = ProductDto.create(req.body);
    if (error) return handleError(error, res);

    new CreateProductUseCase(this.productRepository)
      .execute(productDto!)
      .then((data) => res.json(data))
      .catch((error) => handleError(error, res));
  };

  getProducts = (req: Request, res: Response) => {
    new GetProductsUseCase(this.productRepository)
      .execute()
      .then((data) => res.json(data))
      .catch((error) => handleError(error, res));
  };

  getProduct = (req: Request, res: Response) => {
    new GetProductUseCase(this.productRepository)
      .execute(req.params.productId)
      .then((data) => res.json(data))
      .catch((error) => handleError(error, res));
  };

  getProductByCategory = (req: Request, res: Response) => {
    new GetProductByCategoryUseCase(this.productRepository)
      .execute(req.params.categoryId)
      .then((data) => res.json(data))
      .catch((error) => handleError(error, res));
  };

  updateProduct = (req: Request, res: Response) => {
    new UpdateProductUseCase(this.productRepository)
      .execute(req.params.productId, req.body)
      .then((data) => res.json(data))
      .catch((error) => handleError(error, res));
  };

  deleteProduct = (req: Request, res: Response) =>
    new DeleteProductUseCase(this.productRepository)
      .execute(req.params.productId)
      .then(() => res.json())
      .catch((error) => handleError(error, res));
}
