import { db } from "../database/database";
import { Book, CreateBookRequest } from "../types";

// SQLite row type
interface SqliteBookRow {
  id: number;
  title: string;
  author: string;
  read: number;
  created_at: string;
  updated_at: string;
}

export class BookModel {
  static async getAll(): Promise<Book[]> {
    return new Promise((resolve, reject) => {
      const sql = "SELECT * FROM books ORDER BY created_at DESC";
      db.all(sql, [], (err, rows: SqliteBookRow[]) => {
        if (err) return reject(err);
        const books: Book[] = rows.map((row) => ({
          id: row.id,
          title: row.title,
          author: row.author,
          read: Boolean(row.read),
          created_at: row.created_at,
          updated_at: row.updated_at,
        }));
        resolve(books);
      });
    });
  }

  static async getById(id: number): Promise<Book | null> {
    return new Promise((resolve, reject) => {
      const sql = "SELECT * FROM books WHERE id = ?";
      db.get(sql, [id], (err, row: SqliteBookRow | undefined) => {
        if (err) return reject(err);
        if (!row) return resolve(null);
        const book: Book = {
          id: row.id,
          title: row.title,
          author: row.author,
          read: Boolean(row.read),
          created_at: row.created_at,
          updated_at: row.updated_at,
        };
        resolve(book);
      });
    });
  }

  static async create(bookData: CreateBookRequest): Promise<Book> {
    return new Promise((resolve, reject) => {
      const sql = "INSERT INTO books (title, author) VALUES (?, ?)";
      const params = [bookData.title, bookData.author];
      db.run(sql, params, function (err) {
        if (err) return reject(err);
        BookModel.getById(this.lastID!)
          .then((book) =>
            book
              ? resolve(book)
              : reject(new Error("Failed to retrieve created book"))
          )
          .catch(reject);
      });
    });
  }

  static async update(
    id: number,
    patch: Partial<{ title: string; author: string; read: boolean }>
  ): Promise<Book> {
    return new Promise((resolve, reject) => {
      const fields: string[] = [];
      const params: any[] = [];

      if (patch.title !== undefined) {
        fields.push("title = ?");
        params.push(patch.title);
      }
      if (patch.author !== undefined) {
        fields.push("author = ?");
        params.push(patch.author);
      }
      if (patch.read !== undefined) {
        fields.push("read = ?");
        params.push(patch.read ? 1 : 0);
      }

      if (fields.length === 0) {
        return reject(new Error("No fields to update"));
      }

      const sql = `UPDATE books SET ${fields.join(
        ", "
      )}, updated_at = CURRENT_TIMESTAMP WHERE id = ?`;
      params.push(id);

      db.run(sql, params, function (err) {
        if (err) return reject(err);
        if (this.changes === 0) return reject(new Error("Book not found"));
        BookModel.getById(id)
          .then((book) =>
            book
              ? resolve(book)
              : reject(new Error("Failed to retrieve updated book"))
          )
          .catch(reject);
      });
    });
  }

  static async updateReadStatus(
    id: number,
    readStatus: boolean
  ): Promise<Book> {
    return BookModel.update(id, { read: readStatus });
  }

  static async delete(id: number): Promise<boolean> {
    return new Promise((resolve, reject) => {
      const sql = "DELETE FROM books WHERE id = ?";
      db.run(sql, [id], function (err) {
        if (err) return reject(err);
        if (this.changes === 0) return reject(new Error("Book not found"));
        resolve(true);
      });
    });
  }
}
