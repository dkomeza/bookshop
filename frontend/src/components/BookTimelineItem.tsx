import { motion } from "framer-motion";
import { Checkbox } from "@/components/ui/checkbox";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { keys } from "@/lib/queryClient";
import { toast } from "sonner";
import type { Book } from "@/types";
import { DeleteBookDialog } from "./DeleteDialog";
import { EditBookDialog } from "./EditBookDialog";

export function BookTimelineItem({ book }: { book: Book }) {
  const qc = useQueryClient();

  const toggleRead = useMutation({
    mutationFn: (read: boolean) => api.patchBook(book.id, { read }),
    onMutate: async (read) => {
      await qc.cancelQueries({ queryKey: keys.books });
      const prev = qc.getQueryData<Book[]>(keys.books) || [];
      qc.setQueryData<Book[]>(keys.books, (old = []) =>
        old.map((b) => (b.id === book.id ? { ...b, read } : b))
      );
      return { prev };
    },
    onError: (e, _, ctx) => {
      qc.setQueryData(keys.books, ctx?.prev);
      toast.error("Failed to update", {
        description: (e as any)?.message ?? "Unknown error",
      });
    },
    onSettled: () => qc.invalidateQueries({ queryKey: keys.books }),
  });

  const update = useMutation({
    mutationFn: (data: { title: string; author: string }) =>
      api.patchBook(book.id, data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: keys.books });
      toast.success("Book updated");
    },
    onError: (e: any) =>
      toast.error("Failed to update", {
        description: e?.message ?? "Unknown error",
      }),
  });

  const remove = useMutation({
    mutationFn: () => api.deleteBook(book.id),
    onMutate: async () => {
      await qc.cancelQueries({ queryKey: keys.books });
      const prev = qc.getQueryData<Book[]>(keys.books) || [];
      qc.setQueryData<Book[]>(keys.books, (old = []) =>
        old.filter((b) => b.id !== book.id)
      );
      return { prev };
    },
    onError: (e, _, ctx) => {
      qc.setQueryData(keys.books, ctx?.prev);
      toast.error("Failed to delete", {
        description: (e as any)?.message ?? "Unknown error",
      });
    },
    onSuccess: () => toast.success("Book deleted"),
    onSettled: () => qc.invalidateQueries({ queryKey: keys.books }),
  });

  return (
    <motion.div
      className="relative mb-6 pl-6"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Timeline dot */}
      <span
        className={`absolute left-[-0.4rem] top-1 h-4 w-4 rounded-full ring-2 ring-primary ${
          book.read
            ? "bg-green-500 ring-green-500"
            : "bg-background ring-gray-400"
        }`}
      />

      <div className="flex items-start justify-between">
        <div>
          <h3
            className={`font-semibold ${
              book.read ? "line-through text-muted-foreground" : ""
            }`}
          >
            {book.title}
          </h3>
          <p className="text-sm text-muted-foreground">{book.author}</p>
          <p className="mt-1 text-xs text-muted-foreground">
            {book.read
              ? `Read on ${new Date(book.updated_at).toLocaleDateString()}`
              : `Added on ${new Date(book.created_at).toLocaleDateString()}`}
          </p>
        </div>

        <div className="flex items-center gap-1">
          <Checkbox
            checked={book.read}
            onCheckedChange={(checked) => toggleRead.mutate(checked === true)}
            aria-label={book.read ? "Mark as unread" : "Mark as read"}
          />

          {/* Edit */}
          <EditBookDialog
            book={book}
            isSaving={update.isPending}
            onSave={(t, a) => {
              if (!t || !a) {
                return toast.error("Validation error", {
                  description: "Title and Author are required.",
                });
              }
              update.mutate({ title: t, author: a });
            }}
          />
          <DeleteBookDialog book={book} onConfirm={() => remove.mutate()} />
        </div>
      </div>
    </motion.div>
  );
}
