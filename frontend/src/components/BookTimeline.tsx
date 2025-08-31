import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { keys } from "@/lib/queryClient";
import type { Book } from "@/types";
import { BookTimelineItem } from "./BookTimelineItem";
import { motion } from "framer-motion";

function groupByMonth(books: Book[]) {
  const groups: Record<string, Book[]> = {};
  for (const b of books) {
    if (!b.read) continue;
    const date = new Date(b.updated_at || b.created_at);
    const key = date.toLocaleString("default", {
      month: "long",
      year: "numeric",
    });
    if (!groups[key]) groups[key] = [];
    groups[key].push(b);
  }
  return groups;
}

export function BookTimeline() {
  const { data: books = [], isLoading, isError, error } = useQuery({
    queryKey: keys.books,
    queryFn: api.listBooks,
  });

  const { unread, thisWeek, groups, sortedKeys } = useMemo(() => {
    const now = new Date();
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(now.getDate() - 7);

    const unread = books.filter((b) => !b.read);
    const recent = books.filter(
      (b) =>
        b.read &&
        new Date(b.updated_at || b.created_at) >= oneWeekAgo
    );
    const read = books.filter(
      (b) =>
        b.read &&
        new Date(b.updated_at || b.created_at) < oneWeekAgo
    );

    const groups = groupByMonth(read);
    const sortedKeys = Object.keys(groups).sort((a, b) => {
      const da = new Date(a);
      const db = new Date(b);
      return db.getTime() - da.getTime();
    });

    return { unread, thisWeek: recent, groups, sortedKeys };
  }, [books]);

  if (isLoading) return <p>Loading timeline…</p>;
  if (isError)
    return (
      <p className="text-sm text-destructive">
        Failed to load: {(error as any)?.message ?? "Unknown error"}
      </p>
    );
  if (books.length === 0)
    return (
      <p className="text-sm text-muted-foreground">
        No books yet. Use “Add Book” to create your first one.
      </p>
    );

  return (
    <div className="relative pl-6">
      <span className="absolute left-2 top-0 h-full w-px bg-border" />

      {unread.length > 0 && (
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h2 className="mb-4 text-sm font-semibold uppercase text-muted-foreground">
            Unread
          </h2>
          {unread.map((book) => (
            <BookTimelineItem key={book.id} book={book} />
          ))}
        </motion.div>
      )}

      {thisWeek.length > 0 && (
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h2 className="mb-4 text-sm font-semibold uppercase text-primary">
            This Week
          </h2>
          {thisWeek.map((book) => (
            <BookTimelineItem key={book.id} book={book} />
          ))}
        </motion.div>
      )}

      {sortedKeys.map((key, idx) => (
        <motion.div
          key={key}
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 * idx }}
        >
          <h2 className="mb-4 text-sm font-semibold uppercase text-muted-foreground">
            {key}
          </h2>
          {groups[key].map((book) => (
            <BookTimelineItem key={book.id} book={book} />
          ))}
        </motion.div>
      ))}
    </div>
  );
}