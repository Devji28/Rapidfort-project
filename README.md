# RapidFort: Campus Recruitment Drive

## Overview

This web application processes Word documents (.docx) and converts them to PDF, with additional support for password protection, file metadata viewing, and PDF preview/download functionalities. 

This project adheres to the provided rubric with containerized deployment using Docker and GitHub Actions for CI/CD, making it ready for cloud deployment and scalability.

---

## Features

1. **Core Functionality**:
   - Upload Word documents (.doc or .docx).
   - View file metadata (name, size).
   - Convert Word documents to secure PDFs.
   - Preview the converted PDF directly on the web page.
   - Download the PDF manually after conversion.
   - Password-protect the converted PDFs (optional).

2. **UI Enhancements**:
   - Intuitive user interface with Light/Dark mode toggle.
   - Drag-and-drop area for easy file uploads.
   - Modern responsive design.

3. **Hosting**:
   - **Frontend**: Hosted on **Vercel**.  
     https://rapidfort-front.vercel.app/
   - **Backend**: Hosted on **Render**.  
     https://rapidfort-backend.onrender.com

4. **Containerization**:
   - Backend and frontend are Dockerized and pushed to Docker Hub for seamless deployment.
     - **Backend Docker Image**: [coollip/rapidfort-backend](https://hub.docker.com/r/coollip/rapidfort-backend)
     - **Frontend Docker Image**: [coollip/rapidfort-frontend](https://hub.docker.com/r/coollip/rapidfort-frontend)

5. **Kubernetes**:
   - Kubernetes manifests included for orchestrating deployments.

---

## Technologies Used

### **Frontend**:
- **React**: UI development.
- **CSS**: Styling the user interface.
- **Vercel**: Hosting the frontend application.

### **Backend**:
- **Node.js**: Backend server with API endpoints.
- **Express**: Handling HTTP requests and file uploads.
- **Multer**: File upload management.
- **LibreOffice**: Conversion of Word files to PDF.
- **Hummus-Recipe**: Adding password protection to PDFs.
- **Render**: Hosting the backend service.

### **CI/CD**:
- **GitHub Actions**: Automated Docker builds and deployments.

### **Containerization**:
- **Docker**: For building and deploying containerized images.
- **Kubernetes**: For orchestrating containerized applications.

---

## Hosted Endpoints

### Frontend
Hosted on **Vercel**:  
[RapidFort Frontend](https://rapidfort-front-li19v3l7i-devji28s-projects.vercel.app/)

### Backend
Hosted on **Render**:  
[RapidFort Backend](https://dashboard.render.com/web/srv-ct0qbve8ii6s73f8sdk0/deploys/dep-ct0r1nm8ii6s73f94h1g)

### Docker Hub Images
- **Backend**: [coollip/rapidfort-backend](https://hub.docker.com/r/coollip/rapidfort-backend)
- **Frontend**: [coollip/rapidfort-frontend](https://hub.docker.com/r/coollip/rapidfort-frontend)

---

## Deployment Instructions

### **Local Development**
1. Clone the repository:
   ```bash
   git clone https://github.com/your-repo/rapidfort-project.git
   cd rapidfort-project
   ```

2. Start the backend:
   ```bash
   cd backend
   npm install
   node server.js
   ```

3. Start the frontend:
   ```bash
   cd frontend
   npm install
   npm start
   ```

4. Access the application:
   - Frontend: [http://localhost:3000](http://localhost:3000)
   - Backend: [http://localhost:5000](http://localhost:5000)

---
###Project Structure
php
Copy code
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

### **Docker Deployment**

1. **Build Docker Images**:
   - Backend:
     ```bash
     docker build -t coollip/rapidfort-backend ./backend
     ```
   - Frontend:
     ```bash
     docker build -t coollip/rapidfort-frontend ./frontend
     ```

2. **Run Docker Containers**:
   - Backend:
     ```bash
     docker run -p 5000:5000 coollip/rapidfort-backend
     ```
   - Frontend:
     ```bash
     docker run -p 3000:3000 coollip/rapidfort-frontend
     ```

---

### **Kubernetes Deployment**

1. Apply the manifest files:
   ```bash
   kubectl apply -f kubernetes/deployment.yaml
   kubectl apply -f kubernetes/service.yaml
   ```

2. Access the application using the Kubernetes service.

---

### **GitHub Actions**

- The repository includes a GitHub Actions pipeline to:
  - Build the Docker images for the backend and frontend.
  - Push the images to Docker Hub.

---

### **Bash Script**
Create a script `run.sh` to automate Docker setup:
```bash
#!/bin/bash

echo "Building backend Docker image..."
docker build -t coollip/rapidfort-backend ./backend

echo "Building frontend Docker image..."
docker build -t coollip/rapidfort-frontend ./frontend

echo "Running backend container..."
docker run -d -p 5000:5000 coollip/rapidfort-backend

echo "Running frontend container..."
docker run -d -p 3000:3000 coollip/rapidfort-frontend

echo "Application is running:"
echo "Frontend: http://localhost:3000"
echo "Backend: http://localhost:5000"
```

---

## Rubric Alignment

1. **Repo and Hosting**:
   - Project stored on GitHub and hosted on **Render** (backend) and **Vercel** (frontend).

2. **Documentation**:
   - Detailed project structure, steps, and usage instructions provided.

3. **Exception Handling**:
   - Backend handles invalid file formats, conversion errors, and server-side exceptions.
   - Frontend provides user-friendly error messages for failed operations.

4. **UI**:
   - Responsive, modern design with Light/Dark theme support.

5. **Dockerized Application**:
   - Backend and frontend are Dockerized with images pushed to Docker Hub.

6. **GitHub Actions**:
   - CI/CD pipeline for building and deploying Docker images.

7. **Kubernetes**:
   - Manifest files included for deployment.

---

## Submission
- **Deadline**: 6:00 PM, 23/11/24 (Saturday)
- **Submission Link**: Use the QR code or link provided in the instructions.

---

## Contributors
- **Dev Satija**  
  satijadev8@gmail.com 

For questions or issues, feel free to contact me!
