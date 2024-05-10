import { Router } from "express";
import { AuthDatasouceImpl, AuthRepositoryImpl } from "../../infrestructure";
import { AuthController } from "./controller";

export class AuthRoutes {
  static get routes(): Router {
    const router = Router();

    const datasource = new AuthDatasouceImpl();
    const authRepository = new AuthRepositoryImpl(datasource);
    const controller = new AuthController(authRepository);


    router.post("/register", controller.registerUser);
    router.post('/login', controller.loginUser)
    router.get('/verify-token/:token', controller.verifyAccessToken)
    return router;
  }
}
