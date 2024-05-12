import { Request, Response } from "express";
import {
  CreateProductUseCase,
  GetProductUseCase,
  GetProductsUseCase,
  ProductDto,
  ProductRepository,
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
  }
}
