

export class ProductDto {

  private constructor(
    public name: string,
    public price: number,
    public description: string,
    public stock: number,
    public categoryId: string,
    public makerId: string,
    public imageUrl?: string,
  ){}

  static create(object: { [key: string]: any }): [string?, ProductDto?] {
    const { name, price, description, stock, imageUrl, categoryId, makerId } = object;

    if (!name || name == "") return ["name is required"];
    if (!price || price < 0) return ["price is required"];
    if (!description || description == "") return ["description is required"];
    if (!stock || stock <= 0) return ["stock is required"];
    if (!categoryId || categoryId == "") return ["categoryId is required"];
    if (!makerId || makerId == "") return ["makerId is required"];
    return [undefined, new ProductDto(name, price, description, stock, categoryId, makerId, imageUrl)];
  }

}