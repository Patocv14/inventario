import { ProductDto } from "../../dto";
import { ProductEntity } from "../../entities";
import { ProductRepository } from "../../repositories";


interface UpdateProduct {
  execute(productId: string, product: any): Promise<ProductEntity>;
}

export class UpdateProductUseCase implements UpdateProduct {
  constructor(private readonly productRepository: ProductRepository) {}

  async execute(productId: string, product: ProductDto): Promise<ProductEntity> {
    return await this.productRepository.updateProduct(productId, product);
  }
}