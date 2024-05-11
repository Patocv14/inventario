import { Response, Request } from "express";
import {
  MakerDto,
  CreateMakerUseCase,
  MakerRepository,
  UpdateMakerUseCase,
  DeleteMakerUseCase,
  GetMakerUseCase,
  GetMakersUseCase,
} from "../../domain";
import { handleError } from "../../config";

export class MakerController {
  constructor(private readonly makerRepository: MakerRepository) {}

  createMaker = (req: Request, res: Response) => {
    const [error, makerDto] = MakerDto.create(req.body);
    if (error) return handleError(error, res);

    new CreateMakerUseCase(this.makerRepository)
      .execute(makerDto!)
      .then((data) => res.json(data))
      .catch((error) => handleError(error, res));
  };

  updateMaker = (req: Request, res: Response) => {
    const [error, makerDto] = MakerDto.create(req.body);
    if (error) return handleError(error, res);

    new UpdateMakerUseCase(this.makerRepository)
      .execute(makerDto!, req.params.id)
      .then((data) => res.json(data))
      .catch((error) => handleError(error, res));
  };

  deleteMaker = (req: Request, res: Response) => {
    new DeleteMakerUseCase(this.makerRepository)
      .execute(req.params.id)
      .then(() => res.json())
      .catch((error) => handleError(error, res));
  };

  getMaker = (req: Request, res: Response) => {
    new GetMakerUseCase(this.makerRepository)
      .execute(req.params.id)
      .then((data) => res.json(data))
      .catch((error) => handleError(error, res));
  };

  getMakers = (req: Request, res: Response) => {
    new GetMakersUseCase(this.makerRepository)
      .execute()
      .then((data) => res.json(data))
      .catch((error) => handleError(error, res));
  };
}
