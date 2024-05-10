import { Request, Response } from "express";
import {
  AuthRepository,
  CustomErrors,
  LoginUserDto,
  LoginUserUseCase,
  RegisterUserDto,
  RegisterUserUseCase,
  UpdateUserDto,
  UpdateUserUseCase,
  VerifyTokenUseCase,
} from "../../domain";

export class AuthController {
  constructor(private readonly authRepository: AuthRepository) {}

  private handleError = (error: unknown, res: Response) => {
    if (error instanceof CustomErrors) {
      return res.status(error.statusCode).json({ error: error.message });
    }
    console.log("Error: ", error);
    return res.status(500).json({ error: "Internal Server Error" });
  };

  registerUser = (req: Request, res: Response) => {
    const [error, registerUserDto] = RegisterUserDto.create(req.body);
    if (error) return this.handleError(error, res);

    new RegisterUserUseCase(this.authRepository)
      .exectue(registerUserDto!)
      .then((data) => res.json(data))
      .catch((error) => this.handleError(error, res));
  };

  loginUser = (req: Request, res: Response) => {
    const [error, loginUserDto] = LoginUserDto.login(req.body);
    if (error) return this.handleError(error, res);

    new LoginUserUseCase(this.authRepository)
      .exectute(loginUserDto!)
      .then((data) => res.json(data))
      .catch((error) => this.handleError(error, res));
  };

  verifyAccessToken = (req: Request, res: Response) => {
    const { token } = req.params;

    if (!token)
      return this.handleError(
        CustomErrors.badRequest("Access token is required"),
        res
      );

    new VerifyTokenUseCase(this.authRepository)
      .execute(token)
      .then((data) => res.json(data))
      .catch((error) => this.handleError(error, res));
  };

  deleteUser = (req: Request, res: Response) => {
    const { userId } = req.params;

    if (!userId)
      return this.handleError(
        CustomErrors.badRequest("User id is required"),
        res
      );

    this.authRepository
      .deleteUser(userId)
      .then((data) => res.json(data))
      .catch((error) => this.handleError(error, res));
  };

  updateUser = (req: Request, res: Response) => {
    const { userId } = req.params;
    const [error, updateUserDto] = UpdateUserDto.update(req.body);
    if (error) return this.handleError(error, res);

    new UpdateUserUseCase(this.authRepository)
      .execute(userId, updateUserDto!)
      .then((data) => res.json(data))
      .catch((error) => this.handleError(error, res));
  };

  getUser = (req: Request, res: Response) => {
    const { userId } = req.params;

    if (!userId)
      return this.handleError(
        CustomErrors.badRequest("User id is required"),
        res
      );

    this.authRepository
      .getUser(userId)
      .then((data) => res.json(data))
      .catch((error) => this.handleError(error, res));
  };

  getUsers = (req: Request, res: Response) => {
    this.authRepository
      .getUsers()
      .then((data) => res.json(data))
      .catch((error) => this.handleError(error, res));
  };
}
