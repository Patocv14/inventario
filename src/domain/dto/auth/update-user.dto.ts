

export class UpdateUserDto {

  constructor(
    public name?: string,
    public email?: string,
    public address?: string,
  ){}

  static update(object: { [key: string]: any }): [string?, UpdateUserDto?] {

    const { name, email, address } = object;

    return [undefined, new UpdateUserDto(name, email, address)];
  }

}