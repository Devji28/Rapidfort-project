import React, { useState, useRef, useCallback } from "react";
import "./WordToPdf.css";

export default function WordToPdfConverter() {
  const [isDragging, setIsDragging] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [pdfUrls, setPdfUrls] = useState([]); // For preview and download
  const [password, setPassword] = useState(""); // For password input
  const [darkMode, setDarkMode] = useState(false); // Dark mode state
  const fileInputRef = useRef(null);

  const handleDragEvents = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleDragEnter = useCallback(
    (e) => {
      handleDragEvents(e);
      setIsDragging(true);
    },
    [handleDragEvents]
  );

  const handleDragLeave = useCallback(
    (e) => {
      handleDragEvents(e);
      setIsDragging(false);
    },
    [handleDragEvents]
  );

  const handleDrop = useCallback(
    (e) => {
      handleDragEvents(e);
      setIsDragging(false);
      const files = e.dataTransfer.files;
      handleFileSelection(files);
    },
    [handleDragEvents]
  );

  const handleFileSelection = (files) => {
    if (!files || files.length === 0) return;
    const validFiles = Array.from(files).filter((file) =>
      file.name.match(/\.(doc|docx)$/i)
    );
    if (validFiles.length === 0) {
      alert("Please upload valid Word documents (.doc or .docx)");
      return;
    }
    setSelectedFiles(validFiles);
    setPdfUrls([]); // Reset the preview and download links
  };

  const handleConvert = async () => {
    if (selectedFiles.length === 0) {
      alert("Please select files first");
      return;
    }

    setIsLoading(true);
    try {
      const urls = await Promise.all(
        selectedFiles.map(async (file) => {
          const formData = new FormData();
          formData.append("file", file);
          formData.append("password", password); // Add the password to the request

          const response = await fetch("https://rapidfort-backend.onrender.com/convert", {
            method: "POST",
            body: formData,
          });

          if (!response.ok) {
            throw new Error("Error converting file");
          }

          // Create a blob for download and preview
          const blob = await response.blob();
          return URL.createObjectURL(blob);
        })
      );
      setPdfUrls(urls);
    } catch (error) {
      console.error("Error converting files:", error.message);
      alert("Error converting files: " + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={`converter-container ${darkMode ? "dark-mode" : ""}`}>
      <div className="main-box">
        <header className="converter-header">
          <div className="theme-toggle">
            <label className="switch">
              <input
                type="checkbox"
                checked={darkMode}
                onChange={() => setDarkMode(!darkMode)}
              />
              <span className="slider round"></span>
            </label>
            <span>{darkMode ? "Dark Mode" : "Light Mode"}</span>
          </div>
          <img
            src={process.env.PUBLIC_URL + "/LOGO.png"}
            alt="Converter Logo"
            className="converter-logo"
          />
          <h1>Word to PDF Converter</h1>
          <p className="subtitle">
            Quickly convert your Word documents to secure PDF files with just a
            few clicks.
          </p>
        </header>

        <div
          className={`drag-and-drop-area ${isDragging ? "dragging" : ""}`}
          onDragEnter={handleDragEnter}
          onDragOver={handleDragEnter}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <img
            src={process.env.PUBLIC_URL + "/word-icon.png"}
            alt="Word Icon"
            className="drag-drop-icon"
          />
          <p>Drag and drop your Word documents here</p>
          <input
            type="file"
            ref={fileInputRef}
            accept=".doc,.docx"
            className="hidden"
            multiple
            onChange={(e) => handleFileSelection(e.target.files)}
          />
          <button
            type="button"
            className="browse-button"
            onClick={() => fileInputRef.current?.click()}
          >
            Browse Files
          </button>
        </div>

        {selectedFiles.length > 0 && (
          <div className="file-details">
            <p>
              <strong>Files Selected:</strong> {selectedFiles.length}
            </p>
            <ul>
              {selectedFiles.map((file, index) => (
                <li key={index}>
                  {file.name} - {(file.size / 1024).toFixed(2)} KB
                </li>
              ))}
            </ul>
          </div>
        )}

        {selectedFiles.length > 0 && (
          <div className="password-input">
            <label>Password (Optional):</label>
            <input
              type="password"
              placeholder="Enter password for the PDF"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        )}

        {selectedFiles.length > 0 && (
          <button
            type="button"
            onClick={handleConvert}
            disabled={isLoading}
            className="convert-button"
          >
            {isLoading ? "Converting..." : "Convert to PDF"}
          </button>
        )}

        {isLoading && <div className="loading-spinner"></div>}

        {pdfUrls.length > 0 && (
          <div className="pdf-preview">
            <h2>PDF Preview</h2>
            {pdfUrls.map((url, index) => (
              <div key={index}>
                <iframe src={url} title={`PDF Preview ${index + 1}`}></iframe>
                <button
                  type="button"
                  className="download-button"
                  onClick={() => {
                    const a = document.createElement("a");
                    a.href = url;
                    a.download = `${selectedFiles[index].name.split(".")[0]}.pdf`;
                    a.click();
                  }}
                >
                  Download PDF 
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
