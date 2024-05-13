import { CustomErrors, ProductEntity } from "../../domain";


export class ProductMapper {

  static productEntityFromObject(object: { [key: string]: any}){

    const { id, name, price, description, stock, imageUrl, categoryId, makerId } = object;

    if(!id) throw CustomErrors.badRequest("Missing id");
    if(!name) throw CustomErrors.badRequest("Missing name");
    if(!price) throw CustomErrors.badRequest("Missing price");
    if(!description) throw CustomErrors.badRequest("Missing description");
    if(!stock) throw CustomErrors.badRequest("Missing stock");

    return new ProductEntity(id, name, price, description, stock, imageUrl, categoryId, makerId);

  }

}