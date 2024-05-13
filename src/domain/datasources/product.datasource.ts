import { ProductDto } from "../dto";
import { ProductEntity } from "../entities";

export abstract class ProductDatasource {
  abstract createProduct(product: ProductDto): Promise<ProductEntity>;
  abstract getProducts(): Promise<ProductEntity[]>;
  abstract getProduct(productId: string): Promise<ProductEntity>;
  abstract getProductByCategory(categoryId: string): Promise<ProductEntity[]>;
}