import { PrismaClient, Role } from "@prisma/client";
import { uuid, BcryptAdapter, InternalError } from "../../config";

import {
  RegisterUserDto,
  AuthDatasource,
  UserEntity,
  CustomErrors,
} from "../../domain";
import { UserMapper } from "../mappers";

type HashFunction = (password: string) => string;
type ComparePassword = (password: string, hash: string) => boolean;

export class AuthDatasouceImpl implements AuthDatasource {
  constructor(
    private readonly hashPassword: HashFunction = BcryptAdapter.hash,
    private readonly comparePassword: PrismaClient = new PrismaClient()
  ) {}

  private prisma = new PrismaClient();

  async register(
    registerUserDto: RegisterUserDto,
    accessToken: string
  ): Promise<UserEntity> {
    const { email, name, password, address } = registerUserDto;

    try {
      const userExists = await this.prisma.user.findUnique({
        where: { email },
      });
      if (userExists) throw CustomErrors.badRequest("Try with another email");

      const user = await this.prisma.user.create({
        data: {
          id: uuid(),
          name,
          email,
          address: address || null,
          password: this.hashPassword(password),
          accessToken,
        },
      });
      return UserMapper.userEntityFromObject(user);
    } catch (error) {
      return InternalError(error);
    }
  }
}
