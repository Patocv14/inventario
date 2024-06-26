import { ProductDto } from "../dto";
import { ProductEntity } from "../entities";

export abstract class ProductRepository {

  abstract createProduct(product: ProductDto): Promise<ProductEntity>
  abstract getProducts(): Promise<ProductEntity[]>
  abstract getProduct(productId: string): Promise<ProductEntity>;
  abstract getProductByCategory(categoryId: string): Promise<ProductEntity[]>;
  abstract updateProduct(productId: string, product: ProductDto): Promise<ProductEntity>;
  abstract deleteProduct(productId: string): Promise<void>;
  
}