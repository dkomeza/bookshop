import type { ApiResponse, Book, NewBook, UpdateBook } from "@/types";

const API_BASE =
  import.meta.env.VITE_API_BASE_URL?.replace(/\/$/, "") ??
  "http://localhost:3001/api";

async function http<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`, {
    headers: {
      "Content-Type": "application/json",
      ...(init?.headers ?? {}),
    },
    ...init,
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(
      `API ${res.status} ${res.statusText}${text ? `: ${text}` : ""}`
    );
  }

  const json = (await res.json().catch(() => ({}))) as ApiResponse<T> & {
    message?: string;
  };

  if (!("success" in json)) {
    throw new Error("Malformed API response");
  }
  if (!json.success) {
    throw new Error(json.error || "API error");
  }
  return (json as any).data as T;
}

export const api = {
  listBooks: () => http<Book[]>("/books"),
  getBook: (id: number) => http<Book>(`/books/${id}`),
  createBook: (data: NewBook) =>
    http<Book>("/books", { method: "POST", body: JSON.stringify(data) }),

  patchBook: (id: number, patch: UpdateBook) =>
    http<Book>(`/books/${id}`, {
      method: "PATCH",
      body: JSON.stringify(patch),
    }),

  putBook: (id: number, book: Book) =>
    http<Book>(`/books/${id}`, {
      method: "PUT",
      body: JSON.stringify(book),
    }),

  deleteBook: (id: number) => http<void>(`/books/${id}`, { method: "DELETE" }),
};
