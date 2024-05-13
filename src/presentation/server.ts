import express, { Router } from "express";
import cors from 'cors'

interface Options {
  port?: number;
  routes: Router;
}

export class Server {
  public readonly app = express();
  private readonly port: number;
  private readonly routes: Router;

  constructor({ routes, port = 4000 }: Options) {
    this.port = port;
    this.routes = routes;
  }

  async start() {
    const whitelist = [process.env.FRONTEND_URL];

    const corsOptions = {
      origin: function (origin: any, callback: any) {
        if (whitelist.includes(origin)) {
          // Puede consultar la api
          callback(null, true);
        } else {
          // No esta permitido el request
          callback(new Error("Error de cors"));
        }
      },
    };

    this.app.use(cors(corsOptions));

    this.app.use(express.json());

    this.app.use(this.routes);

    this.app.listen(this.port, () => {
      console.log(`Server is running on port ${this.port}`);
    });
  }
}
