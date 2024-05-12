import { Request, Response } from "express";
import { CreateProductUseCase, ProductDto, ProductRepository } from "../../domain";
import { handleError } from "../../config";


export class ProductController {

  constructor(private productRepository: ProductRepository ){}

  createProduct = (req: Request, res: Response) => {

    const [error, productDto] = ProductDto.create(req.body);
    if(error) return handleError(error, res);

    new CreateProductUseCase(this.productRepository)
      .execute(productDto!)
      .then((data) => res.json(data))
      .catch((error) => handleError(error, res));
  }

}