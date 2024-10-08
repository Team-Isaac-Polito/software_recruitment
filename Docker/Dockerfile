# Use the official Python image from the Docker Hub
FROM python:alpine

# Set the working directory in the container
WORKDIR /app

# Copy the index.html file into the container at /app
COPY index.html /app/

# Expose port 8000 to the outside world
EXPOSE 8000

# Command to run the Python HTTP server
CMD ["python", "-m", "http.server", "8000"]
