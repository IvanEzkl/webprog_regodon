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
  process.exit(1);
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

// Routes
app.use("/api/users", userRoutes);
app.use("/api/articles", articleRoutes);

// Error Handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Server Error" });
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));