import { ProductDatasource, ProductDto, ProductEntity } from '../../domain';
import { ProductRepository } from '../../domain/repositories/product.repository';


export class ProductRepositoryImpl implements ProductRepository {

  constructor(private readonly productDatasource: ProductDatasource) {}

  createProduct(product: ProductDto): Promise<ProductEntity> {
    return this.productDatasource.createProduct(product);
  }

  getProducts(): Promise<ProductEntity[]> {
    return this.productDatasource.getProducts();
  }

  getProduct(productId: string): Promise<ProductEntity> {
    return this.productDatasource.getProduct(productId);
  }

  getProductByCategory(categoryId: string): Promise<ProductEntity[]> {
    return this.productDatasource.getProductByCategory(categoryId);
  }

}