import jwt from "jsonwebtoken";
import { envs } from "./envs.adapter";
import { decode } from "punycode";

const JWT_SEED = envs.JWT_SEED;

export class JwtAdapter {
  static async generateToken(
    payload: Object,
    duration: string = "2h"
  ): Promise<string | null> {
    return new Promise((resolve) => {
      jwt.sign(
        payload,
        JWT_SEED,
        { expiresIn: duration },
        (err, accessToken) => {
          if (err) return resolve(null);
          resolve(accessToken!);
        }
      );
    });
  }

  static validateToken<T>(accessToken: string): Promise<T | null> {
    return new Promise((resolve) => {
      jwt.verify(accessToken, JWT_SEED, (err, decoded) => {
        if (err) return resolve(null);
        resolve(decoded as T);
      });
    });
  }
}
