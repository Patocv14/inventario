export class CategoryDto {
  private constructor(public name: string) {}

  static create(object: { [key: string]: any }): [string?, CategoryDto?] {
    const { name } = object;

    if (!name || name == "") return ["name is required"];

    return [undefined, new CategoryDto(name)];
  }
}
