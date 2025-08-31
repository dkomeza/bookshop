# 📚 Book Tracker

A full-stack book tracking application built with Node.js, TypeScript, React, and SQLite. Track your reading progress, manage your book collection, and never lose track of what you've read.

## ✨ Features

- **Book Management**: Add, view, and delete books
- **Reading Progress**: Mark books as read/unread
- **Smart Filtering**: Filter by read status (All, Read, Unread)
- **Sorting Options**: Sort by title, author, date added, or read status
- **Real-time Updates**: Instant UI updates with React Query
- **Responsive Design**: Works on desktop and mobile devices
- **Type Safety**: Full TypeScript implementation

## 🏗️ Architecture

- **Backend**: Node.js + Express + TypeScript + SQLite
- **Frontend**: React + TypeScript + Vite + Tailwind CSS
- **State Management**: Zustand for local state, React Query for server state
- **UI Components**: shadcn/ui design system
- **Database**: SQLite with automatic schema creation

## 🚀 Quick Start

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. **Clone the repository**

   ```bash
   git clone <your-repo-url>
   cd bookshop
   ```

2. **Install backend dependencies**

   ```bash
   cd backend
   npm install
   ```

3. **Install frontend dependencies**
   ```bash
   cd ../frontend
   npm install
   ```

### Running the Application

1. **Start the backend server**

   ```bash
   cd backend
   npm run dev
   ```

   The backend will start on `http://localhost:3001`

2. **Start the frontend development server**

   ```bash
   cd frontend
   npm run dev
   ```

   The frontend will start on `http://localhost:5173`

3. **Open your browser** and navigate to `http://localhost:5173`

## 📖 API Documentation

### Base URL

```
http://localhost:3001/api
```

### Endpoints

#### Get All Books

```http
GET /books
```

**Response:**

```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "title": "Book Title",
      "author": "Author Name",
      "read": false,
      "created_at": "2025-08-30T16:57:09",
      "updated_at": "2025-08-30T16:57:09"
    }
  ]
}
```

#### Create New Book

```http
POST /books
Content-Type: application/json

{
  "title": "Book Title",
  "author": "Author Name"
}
```

**Response:**

```json
{
  "success": true,
  "data": {
    "id": 2,
    "title": "Book Title",
    "author": "Author Name",
    "read": false,
    "created_at": "2025-08-30T17:08:36",
    "updated_at": "2025-08-30T17:08:36"
  },
  "message": "Book created successfully"
}
```

#### Update Book Read Status

```http
PUT /books/:id/read
Content-Type: application/json

{
  "read": true
}
```

**Response:**

```json
{
  "success": true,
  "data": {
    "id": 2,
    "title": "Book Title",
    "author": "Author Name",
    "read": true,
    "created_at": "2025-08-30T17:08:36",
    "updated_at": "2025-08-30T17:16:03"
  },
  "message": "Book marked as read"
}
```

#### Delete Book

```http
DELETE /books/:id
```

**Response:**

```json
{
  "success": true,
  "message": "Book deleted successfully"
}
```

#### Health Check

```http
GET /health
```

**Response:**

```json
{
  "status": "OK",
  "timestamp": "2025-08-30T17:00:52.718Z",
  "service": "Book Tracker API",
  "environment": "development"
}
```

## 🛠️ Development

### Backend Development

```bash
cd backend

# Run in development mode with hot reload
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

### Frontend Development

```bash
cd frontend

# Run in development mode
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### Database

The SQLite database is automatically created in `backend/data/books.db` when you first run the application. The schema includes:

```sql
CREATE TABLE books (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  author TEXT NOT NULL,
  read BOOLEAN DEFAULT 0,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

## 🧪 Testing

### Manual Testing Checklist

- [ ] Add new books with title and author
- [ ] View list of all books
- [ ] Filter books by read status
- [ ] Sort books by different criteria
- [ ] Mark books as read/unread
- [ ] Delete books
- [ ] Test error handling (empty fields, invalid data)
- [ ] Verify responsive design on different screen sizes

### API Testing

You can test the API endpoints using curl or tools like Postman:

```bash
# Test health endpoint
curl http://localhost:3001/health

# Get all books
curl http://localhost:3001/api/books

# Create a book
curl -X POST http://localhost:3001/api/books \
  -H "Content-Type: application/json" \
  -d '{"title":"Test Book","author":"Test Author"}'
```

## 🚀 Deployment

### Backend Deployment

1. Build the application:

   ```bash
   cd backend
   npm run build
   ```

2. Set environment variables:

   ```bash
   PORT=3001
   NODE_ENV=production
   ```

3. Start the production server:
   ```bash
   npm start
   ```

### Frontend Deployment

1. Build the application:

   ```bash
   cd frontend
   npm run build
   ```

2. Deploy the `dist` folder to your hosting service (Netlify, Vercel, etc.)

## 📁 Project Structure

```
bookshop/
├── backend/                 # Backend application
│   ├── src/
│   │   ├── controllers/    # Request handlers
│   │   ├── models/         # Database models
│   │   ├── routes/         # API routes
│   │   ├── database/       # Database connection
│   │   ├── types/          # TypeScript interfaces
│   │   ├── config/         # Configuration
│   │   └── index.ts        # Entry point
│   ├── data/               # SQLite database files
│   └── package.json
├── frontend/                # Frontend application
│   ├── src/
│   │   ├── components/     # React components
│   │   │   ├── ui/         # Reusable UI components
│   │   │   ├── BookItem.tsx
│   │   │   ├── BookList.tsx
│   │   │   └── AddBookForm.tsx
│   │   ├── services/       # API services
│   │   ├── stores/         # State management
│   │   ├── types/          # TypeScript interfaces
│   │   ├── lib/            # Utility functions
│   │   └── App.tsx         # Main component
│   └── package.json
└── README.md
```

## 🛡️ Error Handling

The application includes comprehensive error handling:

- **Validation Errors**: Required fields, data type validation
- **Database Errors**: Connection issues, query failures
- **API Errors**: Invalid endpoints, server errors
- **Frontend Errors**: Network failures, component errors

## 🔧 Configuration

### Environment Variables

Create a `.env` file in the backend directory:

```env
PORT=3001
NODE_ENV=development
DB_PATH=./data/books.db
```

### CORS Configuration

CORS is enabled for development. For production, configure allowed origins in `backend/src/index.ts`.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🆘 Support

If you encounter any issues:

1. Check the console for error messages
2. Verify both servers are running
3. Check the database connection
4. Review the API endpoints

## 🎯 Future Enhancements

- [ ] User authentication and accounts
- [ ] Reading progress tracking (pages, chapters)
- [ ] Book ratings and reviews
- [ ] Reading lists and categories
- [ ] Export/import functionality
- [ ] Dark mode theme
- [ ] Mobile app version
- [ ] Social features (sharing, recommendations)

---

**Happy Reading! 📖✨**
