import { CustomErrors } from "../../domain";

export function InternalError(error: unknown): never {
  if (error instanceof CustomErrors) {
    throw error;
  }
  throw CustomErrors.internalServer();
}
