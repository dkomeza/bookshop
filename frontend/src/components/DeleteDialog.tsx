// src/components/DeleteBookDialog.tsx
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
  AlertDialogOverlay,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import type { Book } from "@/types";

interface DeleteBookDialogProps {
  book: Book;
  onConfirm: () => void;
}

export function DeleteBookDialog({ book, onConfirm }: DeleteBookDialogProps) {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="ghost" size="icon" aria-label="Delete">
          <Trash2 className="h-4 w-4 text-destructive" />
        </Button>
      </AlertDialogTrigger>

      {/* Overlay with blur */}
      <AlertDialogOverlay className="fixed inset-0 bg-black/40 backdrop-blur-sm" />

      <AlertDialogContent className="sm:max-w-sm rounded-lg border bg-background shadow-lg">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-lg font-semibold">
            Delete this book?
          </AlertDialogTitle>
          <p className="mt-1 text-sm text-muted-foreground">
            “{book.title}” by {book.author}
          </p>
        </AlertDialogHeader>
        <AlertDialogFooter className="sm:justify-end">
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={onConfirm}>Delete</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
