import { Router } from "express";
import { MakerController } from "./controller";
import { MakerDatasourceImpl, MakerRepositoryImpl } from "../../infrestructure";


export class MakerRoutes {

  static get routes(): Router {

    const router = Router();

    const datasource = new MakerDatasourceImpl();
    const repository = new MakerRepositoryImpl(datasource);
    const controller = new MakerController(repository);

    router.post("/", controller.createMaker);
    router.put("/:id", controller.updateMaker);
    router.delete("/:id", controller.deleteMaker);
    router.get("/:id", controller.getMaker);
    router.get("/", controller.getMakers);

    return router;

  }

}