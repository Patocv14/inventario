import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { InternalError, envs } from "../config";
import { PrismaClient } from "@prisma/client";
import { CustomErrors } from "../domain";

interface DecodedToken {
  email: string;
  iat: number;
  exp: number;
}

const isAdmin = async (req: Request, res: Response, next: NextFunction) => {

  const prisma = new PrismaClient();

  let token;
  if(req.headers.authorization && req.headers.authorization.startsWith("Bearer")){
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, envs.JWT_SEED);
      const user = await prisma.user.findUnique({
        // @ts-ignore
        where: { email: decoded.email }
      })
      if(!user) throw CustomErrors.notFound("User not found")
      if(user.role !== "ADMIN") {
        throw CustomErrors.forbidden("You don't have permission to access this resource")
      }

      return next()

    } catch (error) {
      InternalError(error)
    }

  }

  if(!token) {
    return res.status(401).json({
      message: "Unauthorized"
    })
  }


}

export default isAdmin