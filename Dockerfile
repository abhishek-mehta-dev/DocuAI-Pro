# Stage 1: Build the Next.js frontend
FROM node:20 AS frontend
WORKDIR /app/frontend/docuaipro
COPY frontend/docuaipro/package*.json ./
RUN npm ci
COPY frontend/docuaipro ./ 
RUN npm run build

# Stage 2: Final image
FROM python:3.11-slim
WORKDIR /app
COPY backend/requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt
COPY ./backend /app
COPY --from=frontend /app/frontend/docuaipro/out /app/static

EXPOSE 8000
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]
