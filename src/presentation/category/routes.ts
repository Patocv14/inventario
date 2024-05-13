import { Router } from "express";
import { CategoryController } from "./controller";
import { CategoryDatasourceImpl, CategoryRepositoryImpl } from "../../infrestructure";
import isAdmin from "../../middlewares/isAdmin.middleware";


export class CategoryRoutes {

  static get routes(): Router {

    const router = Router();

    const datasource = new CategoryDatasourceImpl();
    const repository = new CategoryRepositoryImpl(datasource);
    const controller = new CategoryController(repository);

    router.post("/", isAdmin ,controller.createCategory);
    router.put("/:id", isAdmin ,controller.updateCategory);
    router.delete("/:id", isAdmin ,controller.deleteCategory);
    router.get("/:id", controller.getCategory);
    router.get("/", controller.getCategories);

    return router;

  }

}