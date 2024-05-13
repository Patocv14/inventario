import { ProductDatasource } from "../../datasources";

interface DeleteProduct {
  execute(productId: string): Promise<void>;
}

export class DeleteProductUseCase implements DeleteProduct {
  constructor(private productDatasource: ProductDatasource) {}

  async execute(productId: string): Promise<void> {
    return this.productDatasource.deleteProduct(productId);
  }
}
