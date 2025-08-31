import { ThemeToggle } from "@/components/ThemeToggle";
import { AddBookDialog } from "@/components/AddBookDialog";
import { BookTimeline } from "@/components/BookTimeline";
import { BookOpen } from "lucide-react";

export default function App() {
  return (
    <div className="min-h-dvh">
      <header className="border-b bg-background/80 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between p-4">
          <div className="flex items-center gap-2">
            <BookOpen className="h-6 w-6 text-primary" />
            <h1 className="text-lg font-semibold">Book Tracker</h1>
          </div>

          <div className="flex items-center gap-3">
            <ThemeToggle />
            <AddBookDialog />
          </div>
        </div>
      </header>
      <main className="mx-auto max-w-6xl p-4">
        <BookTimeline />
      </main>
    </div>
  );
}
