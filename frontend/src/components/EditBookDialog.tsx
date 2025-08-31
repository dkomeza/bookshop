// src/components/EditBookDialog.tsx
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogOverlay,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Pencil } from "lucide-react";
import { useState } from "react";
import type { Book } from "@/types";

interface EditBookDialogProps {
  book: Book;
  onSave: (title: string, author: string) => void;
  isSaving?: boolean;
}

export function EditBookDialog({
  book,
  onSave,
  isSaving,
}: EditBookDialogProps) {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState(book.title);
  const [author, setAuthor] = useState(book.author);

  const handleSave = () => {
    const t = title.trim();
    const a = author.trim();
    if (!t || !a) return; // validation handled outside
    onSave(t, a);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon" aria-label="Edit">
          <Pencil className="h-4 w-4" />
        </Button>
      </DialogTrigger>

      {/* Overlay with blur */}
      <DialogOverlay className="fixed inset-0 bg-black/40 backdrop-blur-sm" />

      <DialogContent className="sm:max-w-md rounded-lg border bg-background shadow-lg">
        <DialogHeader>
          <DialogTitle className="text-base font-medium">Edit book</DialogTitle>
        </DialogHeader>

        <div className="grid gap-3 py-2">
          <div className="grid gap-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="author">Author</Label>
            <Input
              id="author"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
            />
          </div>
        </div>

        <DialogFooter className="sm:justify-end">
          <Button
            variant="secondary"
            onClick={() => {
              setTitle(book.title);
              setAuthor(book.author);
              setOpen(false);
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={() => {
              handleSave();
              setOpen(false);
            }}
            disabled={isSaving}
          >
            {isSaving ? "Saving..." : "Save"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
