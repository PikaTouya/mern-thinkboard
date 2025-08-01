// const express = require("express"); // this is the normal sintax for node js

import express from "express"; // if you want to use import sintax in  node js, u should add "type" : "module" in package.json
import cors from "cors";
import dotenv from "dotenv";
import path from "path";

import notesRoute from "./routes/notesRoute.js";
import { connectDB } from "./config/db.js";
import rateLimiter from "./middleware/ratelimiter.js";

dotenv.config();

const app = express();

const PORT = process.env.PORT || 5001;

const __dirname = path.resolve();

//middleware
if (process.env.NODE_ENV !== "production") {
  app.use(
    cors({
      origin: "http://localhost:5173",
    })
  );
}

app.use(express.json()); // this middleware will parse JSON bodies: req.body

app.use(rateLimiter);

// our simple custom middleware
// app.use((req, res, next) => {
//   console.log(`Req Method is ${req.method} & Req URL is ${req.url}`);
//   next();
// });

app.use("/api/notes", notesRoute);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
  });
}

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log("Server started on PORT: ", PORT);
  });
});
