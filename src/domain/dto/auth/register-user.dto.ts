import { Validators } from "../../../config";


export class RegisterUserDto {
  private constructor(
    public name: string,
    public email: string,
    public password: string,
    public address?: string
  ){}

  static create(object: { [key: string]: any}): [string?, RegisterUserDto?] {

    const { name, email, password, address } = object;

    if(!name || name == "") return ["name is required"];
    if(!email) return ["Email is required"];
    if(!Validators.email.test(email)) return ["Invalid email"];
    if(!password) return ["Password is required"];
    if(password.length < 4) return ["Password must be at least 6 characters"];

    return [undefined, new RegisterUserDto(name, email, password, address)]

  }
}