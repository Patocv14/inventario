import { PrismaClient, Role } from "@prisma/client";
import { uuid, BcryptAdapter, InternalError, JwtAdapter } from "../../config";

import {
  RegisterUserDto,
  AuthDatasource,
  UserEntity,
  CustomErrors,
  LoginUserDto,
} from "../../domain";
import { UserMapper } from "../mappers";

type HashFunction = (password: string) => string;
type ComparePassword = (password: string, hash: string) => boolean;

export class AuthDatasouceImpl implements AuthDatasource {
  constructor(
    private readonly hashPassword: HashFunction = BcryptAdapter.hash,
    private readonly comparePassword: ComparePassword = BcryptAdapter.compare
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

  async login(loginUserDto: LoginUserDto): Promise<UserEntity> {
    const { email, password } = loginUserDto;

    try {
      const user = await this.prisma.user.findUnique({ where: { email } });
      if (!user) throw CustomErrors.unauthorized("Invalid email or password");

      if (!(await JwtAdapter.validateToken(user.accessToken!))) {
        const accessToken = await JwtAdapter.generateToken({ email }, "30d");
        if (!accessToken) throw CustomErrors.internalServer();
        await this.prisma.user.update({
          where: { email },
          data: { accessToken },
        });
      }
      const passwordMatch = this.comparePassword(password, user.password);
      if (!passwordMatch)
        throw CustomErrors.unauthorized("Invalid email or password");

      return UserMapper.userEntityFromObject(user);
    } catch (error) {
      return InternalError(error);
    }
  }

  async verifyAccessToken(accessToken: string): Promise<UserEntity> {
    try {
      const isTokenValid = await JwtAdapter.validateToken(accessToken);
      if (!isTokenValid) throw CustomErrors.unauthorized("Login required");

      const user = await this.prisma.user.findUnique({
        where: { accessToken },
      });
      if (!user) throw CustomErrors.unauthorized("User not found");

      return UserMapper.userEntityFromObject(user);
    } catch (error) {
      return InternalError(error);
    }
  }
}
