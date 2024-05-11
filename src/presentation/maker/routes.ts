import { Router } from "express";


export class MakerRoutes {

  static get routes(): Router {

    const router = Router();

    router.post("/", (req, res) => {
      res.json({ message: "creating maker" });
    });

    return router;

  }

}