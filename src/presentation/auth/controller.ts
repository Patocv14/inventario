import { Request, Response } from "express";
import { AuthRepository, CustomErrors, RegisterUserDto, RegisterUserUseCase } from "../../domain";


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

}