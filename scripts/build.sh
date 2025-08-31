#!/bin/bash

echo "Building Book Tracker Application..."

# Build Backend
echo "Building Backend..."
cd backend
npm install
npm run build
if [ $? -ne 0 ]; then
    echo "Backend build failed"
    exit 1
fi
echo "Backend built successfully"

# Build Frontend
echo "Building Frontend..."
cd ../frontend
npm install
npm run build
if [ $? -ne 0 ]; then
    echo "Frontend build failed"
    exit 1
fi
echo "Frontend built successfully"

# Copy the built frontend into the backend
cp -r ./dist ../backend/public

echo "All builds completed successfully!"
echo ""
echo "To start the production backend:"
echo "   cd backend && npm start"


