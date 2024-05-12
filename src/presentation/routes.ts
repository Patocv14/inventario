import { Router } from "express";
import { AuthRoutes } from "./auth/routes";
import { MakerRoutes } from "./maker/routes";
import { CategoryRoutes } from "./category/routes";
import { ProductRoutes } from "./product/routes";

export class AppRoutes {
  static get routes(): Router {
    const router = Router();

    router.use("/api/auth", AuthRoutes.routes);
    router.use("/api/maker", MakerRoutes.routes);
    router.use('/api/category', CategoryRoutes.routes);
    router.use('/api/product', ProductRoutes.routes)

    return router;
  }
}
