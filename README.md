# RapidFort: Campus Recruitment Drive

## Overview

This is a web application designed to process Word documents (.docx) and convert them to PDF. The application allows users to upload Word files, view file metadata, and download the converted PDF. It supports password protection for PDFs and includes a modern, intuitive user interface.

### Features
- Upload Word documents (.doc and .docx formats).
- View file metadata (file name, size, etc.).
- Convert Word documents to PDFs.
- Preview the converted PDF in the browser.
- Download the converted PDF.
- Add password protection to the PDFs.
- Light/Dark theme support for enhanced user experience.
- Backend hosted on Render and frontend hosted on Vercel.

---

## Hosted Endpoints
### Backend
- The backend is hosted on **Render**:
  [https://dashboard.render.com/web/srv-ct0qbve8ii6s73f8sdk0/deploys/dep-ct0r1nm8ii6s73f94h1g](https://dashboard.render.com/web/srv-ct0qbve8ii6s73f8sdk0/deploys/dep-ct0r1nm8ii6s73f94h1g)

### Frontend
- The frontend is hosted on **Vercel**:
  https://rapidfort-front.vercel.app/

---

## Technologies Used
### Frontend
- **React**: For building the user interface.
- **CSS**: For styling the application.
- **Vercel**: For hosting the frontend.

### Backend
- **Node.js**: For handling server-side logic.
- **Express**: For API creation and handling file uploads.
- **Multer**: For managing file uploads.
- **LibreOffice**: For converting Word documents to PDF.
- **Hummus-Recipe**: For adding password protection to PDFs.
- **Render**: For hosting the backend.

### Containerization
- **Docker**: The application is Dockerized for easy deployment and scalability.

---

## Deployment Pipeline
1. **GitHub Repository**: Store the project in a GitHub repository.
2. **Documentation**: Detailed project documentation and README.
3. **Dockerization**: The application is Dockerized using a `Dockerfile`.
4. **GitHub Actions**: Pipeline to build the Docker image automatically.
5. **Bash Script**: Instructions for running the Docker container locally.
6. **Kubernetes**: Kubernetes manifest files for hosting the web server.

---

## Project Structure
```
📁 rapidfort-project
├── 📁 backend
│   ├── server.js         # Backend logic for file conversion and password protection
│   ├── Dockerfile        # Dockerfile for containerization
│   ├── package.json      # Backend dependencies
│   ├── uploads/          # Directory for uploaded files
│   ├── outputs/          # Directory for converted files
│   └── README.md         # Backend-specific documentation
├── 📁 frontend
│   ├── public/
│   │   ├── logo.png      # Application logo
│   │   ├── word-icon.png # Icon for Word documents
│   ├── src/
│   │   ├── App.js        # React application entry point
│   │   ├── WordToPdf.js  # Main component for file conversion
│   │   ├── WordToPdf.css # Stylesheet for the UI
│   ├── package.json      # Frontend dependencies
│   └── README.md         # Frontend-specific documentation
├── 📁 kubernetes
│   ├── deployment.yaml   # Kubernetes deployment file
│   ├── service.yaml      # Kubernetes service file
│   └── README.md         # Kubernetes documentation
└── README.md             # Root README for the entire project
```

---

## How to Run the Project Locally

### Prerequisites
- Install **Node.js** (v16+).
- Install **Docker**.
- Install **LibreOffice** (if running the backend locally).
- Install **Kubernetes CLI** (if deploying on Kubernetes).

### Steps
1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-repo/rapidfort-project.git
   cd rapidfort-project
   ```

2. **Run the backend**:
   ```bash
   cd backend
   npm install
   node server.js
   ```

3. **Run the frontend**:
   ```bash
   cd frontend
   npm install
   npm start
   ```

4. **Access the application**:
   - Frontend: [http://localhost:3000](http://localhost:3000)
   - Backend: [http://localhost:5000](http://localhost:5000)

---

## Docker Instructions

### Build Docker Images
- Backend:
  ```bash
  docker build -t rapidfort-backend ./backend
  ```
- Frontend:
  ```bash
  docker build -t rapidfort-frontend ./frontend
  ```

### Run Containers
- Backend:
  ```bash
  docker run -p 5000:5000 rapidfort-backend
  ```
- Frontend:
  ```bash
  docker run -p 3000:3000 rapidfort-frontend
  ```

---

## Kubernetes Deployment
1. Apply the manifest files:
   ```bash
   kubectl apply -f kubernetes/deployment.yaml
   kubectl apply -f kubernetes/service.yaml
   ```

2. Access the application using the exposed service endpoint.

---

## Bash Script for Docker
Create a script (`run.sh`) to automate container setup:
```bash
#!/bin/bash

echo "Building backend Docker image..."
docker build -t rapidfort-backend ./backend

echo "Building frontend Docker image..."
docker build -t rapidfort-frontend ./frontend

echo "Running backend container..."
docker run -d -p 5000:5000 rapidfort-backend

echo "Running frontend container..."
docker run -d -p 3000:3000 rapidfort-frontend

echo "Application is running on:"
echo "Frontend: http://localhost:3000"
echo "Backend: http://localhost:5000"
```

---

## Key Features Implemented
1. **Exception Handling**:
   - Backend includes detailed exception handling for file uploads and conversion errors.
   - Alerts for the user in case of errors during file conversion.

2. **Modern UI**:
   - Responsive design with light/dark mode toggle.
   - Preview functionality for converted PDFs.

3. **Documentation**:
   - Comprehensive README and comments in the codebase.

4. **Dockerization**:
   - Backend and frontend are fully containerized for seamless deployment.

5. **Kubernetes**:
   - Manifest files for deploying the application in a Kubernetes cluster.

---

## Submission
- **Submission Deadline**: 6:00 PM, 23/11/24 (Saturday)
- **Submission Link**: Provide the link or QR code for submission. 

---

## Contributors
- [Your Name]
- [Your Email] 

For any questions, feel free to reach out!
