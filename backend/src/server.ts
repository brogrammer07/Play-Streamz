import express from "express";
import morgan from "morgan";
import mongoose from "mongoose";
import cors from "cors";
import bodyParser from "body-parser";
import globals from "./Config/globals.config";
import routes from "./Routes";
// MongoDB connection
mongoose.connect(globals.MONGODB_CONNECTION_URI);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));
// db.once("open", () => {
//   console.log("Connected to MongoDB");
// });

const app = express();
const port = process.env.PORT || 3000;

// Enable CORS
app.use(cors());

// Logging Middleware
app.use(morgan("dev"));

// Parse incoming requests with JSON payloads
app.use(bodyParser.json());
// Parse incoming requests with URL-encoded payloads
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use("/api", routes);

app.get("/", (req, res) => res.send("Hello World"));

const PORT = globals.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running`);
});
