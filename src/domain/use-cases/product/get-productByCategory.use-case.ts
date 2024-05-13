import { ProductEntity } from "../../entities";
import { ProductRepository } from "../../repositories";


interface GetProductByCategory {
  execute(categoryId: string): Promise<ProductEntity[]>;
}

export class GetProductByCategoryUseCase implements GetProductByCategory {

  constructor(private readonly productRepository: ProductRepository) {}

  async execute(categoryId: string): Promise<ProductEntity[]> {
    return await this.productRepository.getProductByCategory(categoryId);
  }

}