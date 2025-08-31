@echo off
echo Building Book Tracker Application...

REM Build Backend
echo Building Backend...
cd backend
npm run build
if errorlevel 1 (
    echo Backend build failed
    exit /b 1
)
echo Backend built successfully

REM Build Frontend
echo Building Frontend...
cd ..\frontend
npm run build
if errorlevel 1 (
    echo Frontend build failed
    exit /b 1
)
echo Frontend built successfully

REM Copy frontend dist into backend/public
echo Copying frontend dist/ into backend/public...
xcopy /E /I /Y dist ..\backend\public

echo All builds completed successfully!
echo.
echo To start the production backend:
echo    cd backend && npm start