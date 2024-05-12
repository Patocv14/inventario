import { Router } from "express";
import { CategoryController } from "./controller";
import { CategoryDatasourceImpl, CategoryRepositoryImpl } from "../../infrestructure";


export class CategoryRoutes {

  static get routes(): Router {

    const router = Router();

    const datasource = new CategoryDatasourceImpl();
    const repository = new CategoryRepositoryImpl(datasource);
    const controller = new CategoryController(repository);

    router.post("/", controller.createCategory);
    router.put("/:id", controller.updateCategory);
    router.delete("/:id", controller.deleteCategory);
    router.get("/:id", controller.getCategory);
    router.get("/", controller.getCategories);

    return router;

  }

}