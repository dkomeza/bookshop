export const config = {
  server: {
    port: process.env.PORT || 3001,
    host: process.env.HOST || "localhost",
  },
  database: {
    path: process.env.DB_PATH || "./data/books.db",
  },
  environment: process.env.NODE_ENV || "development",
};
