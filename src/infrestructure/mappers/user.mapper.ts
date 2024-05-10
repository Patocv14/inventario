import { CustomErrors, UserEntity } from "../../domain"


export class UserMapper {
  static userEntityFromObject(object: { [key: string ]: any}) {
    const { id, name, address, email, password, accessToken, role } = object

    if(!id) throw CustomErrors.badRequest("Missing id");
    if(!name) throw CustomErrors.badRequest("Missing name");
    if(!email) throw CustomErrors.badRequest("Missing email");
    if(!password) throw CustomErrors.badRequest("Missing password");

    return new UserEntity(id, name, address, email, password, accessToken, role)
  }
}