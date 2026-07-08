@echo off
setlocal
cd /d "%~dp0"

echo Starting portfolio dev server...
call npx astro dev --background
if errorlevel 1 (
  echo.
  echo Failed to start the dev server. See errors above.
  pause
  exit /b 1
)

echo.
echo Local:  http://localhost:4321
echo.
echo   npx astro dev status   - check if it's running
echo   npx astro dev logs     - view server logs
echo   npx astro dev stop     - stop the server
echo.

start "" "http://localhost:4321"
