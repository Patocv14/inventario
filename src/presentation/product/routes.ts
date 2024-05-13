import { Router } from "express";
import { ProductDatasourceImpl, ProductRepositoryImpl } from "../../infrestructure";
import { ProductController } from "./controller";


export class ProductRoutes {

  static get routes(): Router {

    const router = Router();

    const datasource = new ProductDatasourceImpl();
    const repository = new ProductRepositoryImpl(datasource);
    const controller = new ProductController(repository);

    router.post('/', controller.createProduct)
    router.get('/', controller.getProducts)
    router.get('/:productId', controller.getProduct)
    router.get('/category/:categoryId', controller.getProductByCategory)

    return router;
  }

}