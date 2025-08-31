export interface Book {
  id: number;
  title: string;
  author: string;
  read: boolean;
  created_at: string;
  updated_at: string;
}

export interface CreateBookRequest {
  title: string;
  author: string;
}

export interface UpdateBookReadRequest {
  read: boolean;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

export interface BooksResponse extends ApiResponse<Book[]> {}
export interface BookResponse extends ApiResponse<Book> {}
export interface MessageResponse extends ApiResponse<null> {}

// Database result interface
export interface DatabaseResult {
  lastID?: number;
  changes?: number;
}
