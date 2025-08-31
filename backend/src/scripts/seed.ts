import { db } from "../database/database";

// --- Random data helpers (same as before) ---
const adjectives = [
  "Pragmatic",
  "Clean",
  "Refactoring",
  "Effective",
  "Essential",
  "Modern",
  "Elegant",
  "Atomic",
  "Domain-Driven",
  "Micro",
];
const topics = [
  "Code",
  "Architecture",
  "Patterns",
  "Systems",
  "APIs",
  "Databases",
  "Testing",
  "TypeScript",
  "JavaScript",
  "Design",
];
const extras = [
  "in Practice",
  "from Scratch",
  "Cookbook",
  "Guidelines",
  "Playbook",
  "Handbook",
  "Principles",
  "Best Practices",
];
const firstNames = [
  "Robert",
  "Martin",
  "Kent",
  "Eric",
  "Rebecca",
  "Sandi",
  "Michael",
  "Andrew",
  "Sarah",
  "Alice",
  "Jon",
];
const lastNames = [
  "Martin",
  "Beck",
  "Evans",
  "Wirfs-Brock",
  "Metz",
  "Feathers",
  "Hunt",
  "Thomas",
  "Johnson",
  "Fowler",
];

function randInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
function pick<T>(arr: T[]): T {
  return arr[randInt(0, arr.length - 1)];
}
function title(): string {
  const pattern = randInt(1, 3);
  if (pattern === 1) return `${pick(adjectives)} ${pick(topics)}`;
  if (pattern === 2) return `The ${pick(topics)} Handbook`;
  return `${pick(topics)} ${pick(extras)}`;
}
function author(): string {
  return `${pick(firstNames)} ${pick(lastNames)}`;
}
function randomPastDate(monthsBack = 36): Date {
  const now = new Date();
  const past = new Date();
  past.setMonth(now.getMonth() - monthsBack);
  const t = randInt(past.getTime(), now.getTime());
  return new Date(t);
}
function randomBetween(start: Date, end: Date): Date {
  const ts = randInt(start.getTime(), end.getTime());
  return new Date(ts);
}
function toSqlite(dt: Date): string {
  const y = dt.getFullYear();
  const m = String(dt.getMonth() + 1).padStart(2, "0");
  const d = String(dt.getDate()).padStart(2, "0");
  const hh = String(dt.getHours()).padStart(2, "0");
  const mm = String(dt.getMinutes()).padStart(2, "0");
  const ss = String(dt.getSeconds()).padStart(2, "0");
  return `${y}-${m}-${d} ${hh}:${mm}:${ss}`;
}

// --- Seeder ---
export async function seedBooks(
  count = 50,
  { wipe = true }: { wipe?: boolean } = {}
) {
  console.log(`Seeding ${count} books... (wipe=${wipe})`);

  await new Promise<void>((resolve, reject) => {
    db.serialize(() => {
      if (wipe) {
        db.run("DELETE FROM books", (err) => {
          if (err) return reject(err);
        });
      }

      db.run("BEGIN TRANSACTION", (err) => {
        if (err) return reject(err);

        const stmt = db.prepare(
          `INSERT INTO books (title, author, read, created_at, updated_at)
           VALUES (?, ?, ?, ?, ?)`
        );

        for (let i = 0; i < count; i++) {
          const createdAt = randomPastDate(36);
          const isRead = Math.random() < 0.6;

          const readAt = isRead
            ? randomBetween(createdAt, new Date())
            : randomBetween(
                createdAt,
                new Date(createdAt.getTime() + 1000 * 60 * 60 * 24 * 60)
              );

          const created_at = toSqlite(createdAt);
          const updated_at = toSqlite(readAt);

          stmt.run(
            title(),
            author(),
            isRead ? 1 : 0,
            created_at,
            updated_at,
            (err: any) => {
              if (err) console.error("Insert error:", err);
            }
          );
        }

        stmt.finalize((err) => {
          if (err) {
            db.run("ROLLBACK", () => reject(err));
            return;
          }
          db.run("COMMIT", (err2) => {
            if (err2) return reject(err2);
            resolve();
          });
        });
      });
    });
  });

  console.log("Seeding done.");
}

if (require.main === module) {
  // Simple CLI args
  const args = process.argv.slice(2);
  let count = 20;
  let wipe = true;

  for (let i = 0; i < args.length; i++) {
    const arg = args[i];
    if (arg === "--count" && args[i + 1]) {
      count = parseInt(args[i + 1], 10);
      i++;
    } else if (arg === "--keep") {
      wipe = false;
    }
  }

  seedBooks(count, { wipe })
    .then(() => process.exit(0))
    .catch((e) => {
      console.error(e);
      process.exit(1);
    });
}
