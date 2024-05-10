import { Validators } from "../../../config";


export class LoginUserDto {

  constructor(
    public email: string,
    public password: string
  ){}

  static login(object: { [key: string]: any }): [string?, LoginUserDto?] {

    const { email, password } = object;

    if (!email) return ['Email is required'];
    if(!Validators.email.test(email)) return ['Invalid email format'];
    if (!password) return ['Password is required'];

    return [undefined, new LoginUserDto(email, password)];

  }

}