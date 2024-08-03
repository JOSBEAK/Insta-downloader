# Use an official Node runtime as a parent image
FROM node:14 AS frontend

WORKDIR /app/frontend

# Copy package.json and package-lock.json
COPY frontend/package*.json ./

# Install dependencies
RUN npm install

# Copy frontend source
COPY frontend/ .

# Build the Next.js app
RUN npm run build

# Use an official Python runtime as a parent image
FROM python:3.9

WORKDIR /app

# Copy backend requirements and install dependencies
COPY backend/requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy backend source
COPY backend/ .

# Copy built frontend from the frontend stage
COPY --from=frontend /app/frontend/.next /app/frontend/.next

# Install Node.js in the Python image (for serving Next.js)
RUN curl -sL https://deb.nodesource.com/setup_14.x | bash -
RUN apt-get install -y nodejs

# Copy frontend package.json and install production dependencies
COPY frontend/package*.json /app/frontend/
RUN cd /app/frontend && npm install --only=production

# Expose the port the app runs on
EXPOSE 8000

# Create a script to run both frontend and backend
RUN echo '#!/bin/bash\n\
    cd /app/frontend && npm start &\n\
    cd /app && uvicorn main:app --host 0.0.0.0 --port 8000' > /app/start.sh

RUN chmod +x /app/start.sh

# Run the script
CMD ["/app/start.sh"]