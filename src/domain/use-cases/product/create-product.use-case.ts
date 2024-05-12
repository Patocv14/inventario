import { ProductDto } from "../../dto";
import { ProductEntity } from "../../entities";
import { ProductRepository } from "../../repositories";


interface CreateProduct {
  execute(productDto: ProductDto): Promise<ProductEntity>;
}

export class CreateProductUseCase implements CreateProduct {

  constructor(
    private readonly productRepository: ProductRepository
  ){}

  async execute(productDto: ProductDto): Promise<ProductEntity> {
    return await this.productRepository.createProduct(productDto);
  }

}