const fs = require("fs");
const path = require("path");
const dotenv = require("dotenv");
const envPaths = [
  path.resolve(__dirname, ".env"),
  path.resolve(__dirname, "../.env"),
];

let loaded = false;
for (const envPath of envPaths) {
  if (!fs.existsSync(envPath)) {
    continue;
  }
  const envResult = dotenv.config({ path: envPath });
  if (envResult.error) {
    console.warn(`Warning: failed to load .env from ${envPath}`);
  } else {
    loaded = true;
    break;
  }
}

if (!loaded) {
  console.warn("Warning: no .env file found in regodon-server/ or repo root");
}
if (!process.env.MONGO_URI) {
  console.error("Missing MONGO_URI. Check your .env file location and value.");
  if (!process.env.VERCEL) {
    process.exit(1);
  }
}
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const jsonParser = bodyParser.json();
const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const articleRoutes = require("./routes/articleRoutes");

const app = express();

// Database Connection
connectDB();

app.use(express.json());

// Check if Database Configuration is complete and ensure connection (crucial for Serverless cold starts)
app.use(async (req, res, next) => {
  if (!process.env.MONGO_URI) {
    return res.status(500).json({
      message: "Database Configuration Error",
      error: "Missing MONGO_URI environment variable on Vercel.",
      hint: "Please add MONGO_URI in your Vercel Project Settings > Environment Variables."
    });
  }

  const mongoose = require("mongoose");
  
  // Mask connection string for security in logs/responses
  const maskedUri = process.env.MONGO_URI.replace(/:([^@]+)@/, ":******@");

  if (mongoose.connection.readyState !== 1) {
    console.log(`Database state is ${mongoose.connection.readyState}. Attempting to connect...`);
    try {
      if (mongoose.connection.readyState === 2) {
        // If connection is in progress, wait for the connection promise to resolve
        await new Promise((resolve) => {
          mongoose.connection.once('connected', () => {
            console.log("Database connection established.");
            resolve();
          });
          mongoose.connection.once('error', (err) => {
            console.error("Database connection error while waiting:", err);
            resolve();
          });
          // Timeout after 5 seconds
          setTimeout(() => {
            console.log("Database connection wait timed out (5s).");
            resolve();
          }, 5000);
        });
      } else {
        await mongoose.connect(process.env.MONGO_URI, {});
      }

      if (mongoose.connection.readyState !== 1) {
        return res.status(500).json({
          message: "Database Connection State Error",
          readyState: mongoose.connection.readyState,
          uri: maskedUri,
          hint: "The database connection is still in progress or failed to establish. Please check if your MongoDB Atlas whitelisting (0.0.0.0/0) is active."
        });
      }
    } catch (err) {
      return res.status(500).json({
        message: "Database Connection Error",
        error: err.message,
        uri: maskedUri
      });
    }
  }
  next();
});

// Middleware
app.use(jsonParser);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

// vercel options
const corsOptions = {
  origin: "*", // Allow all origins
  credentials: true, // Allow credentials
  allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
  methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE"],
  preflightContinue: false,
  optionsSuccessStatus: 204, // For legacy browser support
};

app.options("", cors(corsOptions)); // Pre-flight request for all routes
app.use(cors(corsOptions));

// Curb Cores Error by adding a header here
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});

// Default Root Route
app.get("/", (req, res) => {
  res.json({ message: "Regodon API Server is running!" });
});

// Debug Endpoint
app.get("/api/debug-db", (req, res) => {
  const uri = process.env.MONGO_URI || "";
  res.json({
    hasUri: !!uri,
    uriLength: uri.length,
    startsWithQuote: uri.startsWith('"') || uri.startsWith("'"),
    endsWithQuote: uri.endsWith('"') || uri.endsWith("'"),
    maskedUri: uri.replace(/:([^@]+)@/, ":******@"),
    readyState: require("mongoose").connection.readyState,
  });
});

// Routes
app.use("/api/users", userRoutes);
app.use("/api/articles", articleRoutes);

// Error Handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Server Error" });
});

const PORT = process.env.PORT || 8000;
if (!process.env.VERCEL) {
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}

module.exports = app;