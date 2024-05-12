import { ProductEntity } from "../../entities";
import { ProductRepository } from "../../repositories";

interface GetProducts {
  execute(): Promise<ProductEntity[]>;
}

export class GetProductsUseCase implements GetProducts {
  constructor(private readonly productRepository: ProductRepository) {}

  async execute(): Promise<ProductEntity[]> {
    return await this.productRepository.getProducts();
  }
}
