# 📚 Book Tracker

A full-stack book tracking application built with Node.js, TypeScript, React, and SQLite.

## Running the app

### Prerequisites

- Node.js (v20 or higher)
- npm

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/dkomeza/bookshop.git
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

#### Dev environment

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

#### Production

1. **Build the app**

   ```bash
   ./scripts/build.sh (or ./scripts/build.bat on Windows)
   ```

2. (Optional) You can seed the database (add random books)

   ```bash
   cd backend && npm run seed
   ```

3. **Run the Node server**

   ```bash
   cd backend && npm run start
   ```

4. **Open your browser** and navigate to `http://localhost:3001`
