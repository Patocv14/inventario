import { ProductEntity } from "../../entities";
import { ProductRepository } from "../../repositories";

interface GetProduct {
  execute(productId: string): Promise<ProductEntity>;
}

export class GetProductUseCase implements GetProduct {

  constructor(
    private readonly productRepository: ProductRepository
  ){}

  async execute(productId: string): Promise<ProductEntity> {
    return await this.productRepository.getProduct(productId);
  }
}
