import { Router } from "express";

export class AppRoutes {
  static get routes(): Router {
    const router = Router();

    router.get("/api/auth", (req, res) => {
      res.json("Hello from auth");
    });

    return router;
  }
}
