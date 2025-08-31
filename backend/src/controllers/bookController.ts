import { Request, Response } from "express";
import { BookModel } from "../models/Book";

// Envelope helpers
const ok = <T>(res: Response, data: T, message?: string) =>
  res.json({ success: true, data, ...(message ? { message } : {}) });

const fail = (res: Response, status: number, error: string) =>
  res.status(status).json({ success: false, error });

export class BookController {
  static async getAllBooks(_req: Request, res: Response) {
    try {
      const books = await BookModel.getAll();
      return ok(res, books);
    } catch (error) {
      console.error("Error getting books:", error);
      return fail(res, 500, "Failed to retrieve books");
    }
  }

  static async getBookById(_req: Request, res: Response) {
    try {
      const { id } = (res.locals as any).params as { id: number };
      const book = await BookModel.getById(id);
      if (!book) return fail(res, 404, "Book not found");
      return ok(res, book);
    } catch (error) {
      console.error("Error getting book:", error);
      return fail(res, 500, "Failed to retrieve book");
    }
  }

  static async createBook(_req: Request, res: Response) {
    try {
      const { title, author } = (res.locals as any).body as {
        title: string;
        author: string;
      };
      const book = await BookModel.create({ title, author });
      return res.status(201).json({
        success: true,
        data: book,
        message: "Book created successfully",
      });
    } catch (error) {
      console.error("Error creating book:", error);
      return fail(res, 500, "Failed to create book");
    }
  }

  static async updateBook(_req: Request, res: Response) {
    try {
      const { id } = (res.locals as any).params as { id: number };
      const patch = (res.locals as any).body as Partial<{
        title: string;
        author: string;
        read: boolean;
      }>;
      const updated = await BookModel.update(id, patch);
      if (!updated) return fail(res, 404, "Book not found");
      return ok(
        res,
        updated,
        typeof patch.read === "boolean"
          ? `Book marked as ${patch.read ? "read" : "unread"}`
          : "Book updated"
      );
    } catch (error) {
      console.error("Error updating book:", error);
      if (error instanceof Error && /not found/i.test(error.message)) {
        return fail(res, 404, "Book not found");
      }
      return fail(res, 500, "Failed to update book");
    }
  }

  static async deleteBook(_req: Request, res: Response) {
    try {
      const { id } = (res.locals as any).params as { id: number };
      await BookModel.delete(id);
      return res.json({
        success: true,
        message: "Book deleted successfully",
      });
    } catch (error) {
      console.error("Error deleting book:", error);
      if (error instanceof Error && /not found/i.test(error.message)) {
        return fail(res, 404, "Book not found");
      }
      return fail(res, 500, "Failed to delete book");
    }
  }
}