import { ProductDto } from "../dto";
import { ProductEntity } from "../entities";


export abstract class ProductDatasource {

  abstract createProduct(product: ProductDto): Promise<ProductEntity>

}