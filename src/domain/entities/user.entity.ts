enum Role {
  ADMIN = 'ADMIN',
  USER = 'USER'
}

export { Role as UserRole };


export class UserEntity {

  constructor(
    public id: string,
    public name: string,
    public address: string | null, 
    public password: string,
    public email: string,
    public token: string | null,
    public role: Role | null
  ){}

}