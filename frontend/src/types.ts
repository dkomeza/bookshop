export interface Book {
  id: number;
  title: string;
  author: string;
  read: boolean;
  created_at: string;
  updated_at: string;
}

export type NewBook = Pick<Book, "title" | "author">;
export type UpdateBook = Partial<Pick<Book, "title" | "author" | "read">>;

export type ApiSuccess<T> = { success: true; data: T; message?: string };
export type ApiError = { success: false; error: string };
export type ApiResponse<T> = ApiSuccess<T> | ApiError;
