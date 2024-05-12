

export class ProductEntity {

  constructor(
    public id: string,
    public name: string,
    public price: number,
    public description: string,
    public stock: number,
    public imageUrl: string,
    public categoryId: string,
    public makerId: string,
  ){}

}