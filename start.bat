@echo off
echo ============================================================
echo   Restaurant Management System - Startup Script
echo ============================================================
echo.

REM Check if Python is installed
python --version >nul 2>&1
if errorlevel 1 (
    echo ERROR: Python is not installed or not in PATH
    echo Please install Python 3.8 or higher from python.org
    pause
    exit /b 1
)

echo [1/3] Checking Python installation...
python --version

echo.
echo [2/3] Installing/Updating dependencies...
pip install -r requirements.txt

echo.
echo [3/3] Starting the application...
echo.
python app.py

pause

