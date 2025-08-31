import { Router } from "express";
import { BookController } from "../controllers/bookController";
import {
  CreateBookSchema,
  IdParamSchema,
  UpdateBookSchema,
} from "../validation/bookSchemas";
import { validateBody, validateParams } from "../middleware/validate";

export const booksRouter = Router();

booksRouter.get("/", BookController.getAllBooks);
booksRouter.get(
  "/:id",
  validateParams(IdParamSchema),
  BookController.getBookById
);
booksRouter.post(
  "/",
  validateBody(CreateBookSchema),
  BookController.createBook
);
booksRouter.patch(
  "/:id",
  validateParams(IdParamSchema),
  validateBody(UpdateBookSchema),
  BookController.updateBook
);
booksRouter.delete(
  "/:id",
  validateParams(IdParamSchema),
  BookController.deleteBook
);
