import { CustomErrors } from "../../domain";

export function InternalError(error: unknown): never {
  if (error instanceof CustomErrors) {
    throw error;
  }
  console.log(error)
  throw CustomErrors.internalServer();
}
