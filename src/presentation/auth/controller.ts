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
import { handleError } from "../../config";

export class AuthController {
  constructor(private readonly authRepository: AuthRepository) {}

  registerUser = (req: Request, res: Response) => {
    const [error, registerUserDto] = RegisterUserDto.create(req.body);
    if (error) return handleError(error, res);

    new RegisterUserUseCase(this.authRepository)
      .exectue(registerUserDto!)
      .then((data) => res.json(data))
      .catch((error) => handleError(error, res));
  };

  loginUser = (req: Request, res: Response) => {
    const [error, loginUserDto] = LoginUserDto.login(req.body);
    if (error) return handleError(error, res);

    new LoginUserUseCase(this.authRepository)
      .exectute(loginUserDto!)
      .then((data) => res.json(data))
      .catch((error) => handleError(error, res));
  };

  verifyAccessToken = (req: Request, res: Response) => {
    const { token } = req.params;

    if (!token)
      return handleError(
        CustomErrors.badRequest("Access token is required"),
        res
      );

    new VerifyTokenUseCase(this.authRepository)
      .execute(token)
      .then((data) => res.json(data))
      .catch((error) => handleError(error, res));
  };

  deleteUser = (req: Request, res: Response) => {
    const { userId } = req.params;

    if (!userId)
      return handleError(
        CustomErrors.badRequest("User id is required"),
        res
      );

    this.authRepository
      .deleteUser(userId)
      .then((data) => res.json(data))
      .catch((error) => handleError(error, res));
  };

  updateUser = (req: Request, res: Response) => {
    const { userId } = req.params;
    const [error, updateUserDto] = UpdateUserDto.update(req.body);
    if (error) return handleError(error, res);

    new UpdateUserUseCase(this.authRepository)
      .execute(userId, updateUserDto!)
      .then((data) => res.json(data))
      .catch((error) => handleError(error, res));
  };

  getUser = (req: Request, res: Response) => {
    const { userId } = req.params;

    if (!userId)
      return handleError(
        CustomErrors.badRequest("User id is required"),
        res
      );

    this.authRepository
      .getUser(userId)
      .then((data) => res.json(data))
      .catch((error) => handleError(error, res));
  };

  getUsers = (req: Request, res: Response) => {
    this.authRepository
      .getUsers()
      .then((data) => res.json(data))
      .catch((error) => handleError(error, res));
  };
}
