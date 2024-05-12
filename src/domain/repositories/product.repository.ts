import { ProductDto } from "../dto";
import { ProductEntity } from "../entities";


export abstract class ProductRepository {

  abstract createProduct(product: ProductDto): Promise<ProductEntity>
  abstract getProducts(): Promise<ProductEntity[]>

}