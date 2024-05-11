export class MakerDto {
  private constructor(public name: string) {}

  static create(object: { [key: string]: any }): [string?, MakerDto?] {
    const { name } = object;

    if (!name || name == "") return ["name is required"];

    return [undefined, new MakerDto(name)];
  }
}
