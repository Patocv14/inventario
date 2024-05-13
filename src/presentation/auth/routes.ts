import { Router } from "express";
import { AuthDatasouceImpl, AuthRepositoryImpl } from "../../infrestructure";
import { AuthController } from "./controller";
import isAdmin from "../../middlewares/isAdmin.middleware";

export class AuthRoutes {
  static get routes(): Router {
    const router = Router();

    const datasource = new AuthDatasouceImpl();
    const authRepository = new AuthRepositoryImpl(datasource);
    const controller = new AuthController(authRepository);


    router.post("/register", isAdmin ,controller.registerUser);
    router.post('/login', controller.loginUser)
    router.get('/verify-token/:token', controller.verifyAccessToken)
    router.get('/:userId', controller.getUser)
    router.get('/', controller.getUsers)
    router.put('/:userId', isAdmin ,controller.updateUser)
    router.delete('/:userId', isAdmin ,controller.deleteUser)
    return router;
  }
}
