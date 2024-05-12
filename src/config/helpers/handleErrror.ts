import { CustomErrors } from "../../domain";
import { Response } from "express";

export const handleError = (error: unknown, res: Response) => {
  if (error instanceof CustomErrors) {
    return res.status(error.statusCode).json({ error: error.message });
  }
  console.log("Error: ", error);
  return res.status(500).json({ error: error });
};
