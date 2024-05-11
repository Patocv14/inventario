import { Router } from "express";
import { AuthRoutes } from "./auth/routes";
import { MakerRoutes } from "./maker/routes";

export class AppRoutes {
  static get routes(): Router {
    const router = Router();

    router.use("/api/auth", AuthRoutes.routes);
    router.use("/api/maker", MakerRoutes.routes);

    return router;
  }
}
