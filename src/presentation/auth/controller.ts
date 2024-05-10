import { Request, Response } from "express";
import { AuthRepository, CustomErrors, LoginUserDto, LoginUserUseCase, RegisterUserDto, RegisterUserUseCase, VerifyTokenUseCase } from "../../domain";


export class AuthController {

  constructor(private readonly authRepository: AuthRepository) {}

  private handleError = (error: unknown, res: Response) => {
    if (error instanceof CustomErrors) {
      return res.status(error.statusCode).json({ error: error.message });
    }
    console.log('Error: ', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  };

  registerUser = (req: Request, res: Response) => {
    const [error, registerUserDto] = RegisterUserDto.create(req.body);
    if (error) return this.handleError(error, res);

    new RegisterUserUseCase(this.authRepository)
      .exectue(registerUserDto!)
      .then( data => res.json(data))
      .catch( error => this.handleError(error, res));
  }

  loginUser = (req: Request, res: Response) => {
    const [error, loginUserDto ] = LoginUserDto.login(req.body);
    if (error) return this.handleError(error, res);

    new LoginUserUseCase(this.authRepository)
      .exectute(loginUserDto!)
      .then( data => res.json(data))
      .catch( error => this.handleError(error, res));
  }

  verifyAccessToken = (req: Request, res: Response ) => {
    const { token } = req.params;

    if(!token) return this.handleError(CustomErrors.badRequest('Access token is required'), res);

    new VerifyTokenUseCase(this.authRepository)
      .execute(token)
      .then( data => res.json(data))
      .catch( error => this.handleError(error, res));



  }

}