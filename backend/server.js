const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs-extra");
const cors = require("cors");
const { spawn } = require("child_process");
const HummusRecipe = require('muhammara').Recipe;

const app = express();
const PORT = process.env.PORT || 5000;

// Use an environment variable for LibreOffice path
const libreOfficePath = process.env.LIBREOFFICE_PATH || "soffice"; // Default to "soffice" for server environments
const outputDir = path.resolve("outputs");

// Enable CORS to allow requests from the frontend
app.use(cors());
app.use(express.json()); // For parsing JSON bodies
app.use(express.urlencoded({ extended: true })); // For parsing form data

// Multer setup for file uploads
const upload = multer({
  dest: "uploads/",
  fileFilter: (req, file, cb) => {
    if (!file.originalname.match(/\.(doc|docx)$/)) {
      return cb(new Error("Only .doc and .docx files are allowed!"));
    }
    cb(null, true);
  },
});

// Function to convert DOCX to PDF using LibreOffice
const convertToPdf = (inputPath, outputDir) => {
  return new Promise((resolve, reject) => {
    const process = spawn(libreOfficePath, [
      "--headless",
      "--convert-to",
      "pdf",
      inputPath,
      "--outdir",
      outputDir,
    ]);

    process.stdout.on("data", (data) => {
      console.log(`LibreOffice output: ${data}`);
    });

    process.stderr.on("data", (data) => {
      console.error(`LibreOffice error: ${data}`);
    });

    process.on("error", (err) => {
      console.error("LibreOffice spawn error:", err);
      reject(err);
    });

    process.on("close", (code) => {
      if (code === 0) {
        const originalName = path.parse(inputPath).name;
        const outputFile = path.join(outputDir, `${originalName}.pdf`);
        if (fs.existsSync(outputFile)) {
          resolve(outputFile);
        } else {
          reject(new Error("Output file not found after conversion."));
        }
      } else {
        reject(new Error(`LibreOffice failed with exit code ${code}`));
      }
    });
  });
};

// Function to add password protection using hummus-recipe
const addPasswordProtection = (inputPdfPath, outputPdfPath, password) => {
  return new Promise((resolve, reject) => {
    try {
      const pdfDoc = new HummusRecipe(inputPdfPath, outputPdfPath);

      pdfDoc.encrypt({
        userPassword: password,
        ownerPassword: password,
        userProtectionFlag: 4, // Allows only viewing and printing
      });

      pdfDoc.endPDF();
      resolve(outputPdfPath);
    } catch (error) {
      reject(error);
    }
  });
};

// API endpoint for file upload and conversion
app.post("/convert", upload.single("file"), async (req, res) => {
  const file = req.file;
  const password = req.body.password; // Retrieve the password from the request body

  if (!file) {
    console.error("No file received");
    return res.status(400).send({ error: "No file uploaded." });
  }

  const filePath = path.resolve(file.path);
  console.log("File uploaded:", filePath);

  let convertedFile;

  try {
    // Convert the file
    convertedFile = await convertToPdf(filePath, outputDir);
    console.log("Conversion successful:", convertedFile);

    // If a password is provided, encrypt the PDF
    if (password) {
      console.log("Applying password protection...");
      const encryptedFile = convertedFile.replace(".pdf", "_encrypted.pdf");
      await addPasswordProtection(convertedFile, encryptedFile, password);
      console.log("Password protection applied successfully.");
      convertedFile = encryptedFile; // Update to use the encrypted file
    }

    // Send the converted (and possibly encrypted) PDF to the client
    res.sendFile(convertedFile, (err) => {
      if (err) {
        console.error("Error sending file:", err.message);
        res.status(500).send({ error: "Failed to send the file." });
        return;
      }

      console.log("File sent successfully. Cleaning up...");
      // Cleanup files after successful response
      fs.remove(filePath).catch((err) =>
        console.error("Error cleaning up uploaded file:", err.message)
      );
      fs.remove(convertedFile).catch((err) =>
        console.error("Error cleaning up converted file:", err.message)
      );
    });
  } catch (err) {
    console.error("Error during conversion process:", err.message);

    // Cleanup in case of error
    await fs.remove(filePath).catch((cleanupErr) => {
      console.error("Error cleaning up uploaded file:", cleanupErr.message);
    });

    if (convertedFile) {
      await fs.remove(convertedFile).catch((cleanupErr) => {
        console.error("Error cleaning up converted file:", cleanupErr.message);
      });
    }

    res.status(500).send({ error: "Something went wrong during the conversion." });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
