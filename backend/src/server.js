// const express = require("express"); // this is the normal sintax for node js

import express from "express"; // if you want to use import sintax in  node js, u should add "type" : "module" in package.json
import cors from "cors";
import dotenv from "dotenv";

import notesRoute from "./routes/notesRoute.js";
import { connectDB } from "./config/db.js";
import rateLimiter from "./middleware/ratelimiter.js";

dotenv.config();

const app = express();

const PORT = process.env.PORT || 5001;

//middleware
app.use(
  cors({
    origin: "http://localhost:5173",
  })
);

app.use(express.json()); // this middleware will parse JSON bodies: req.body

app.use(rateLimiter);

// our simple custom middleware
// app.use((req, res, next) => {
//   console.log(`Req Method is ${req.method} & Req URL is ${req.url}`);
//   next();
// });

app.use("/api/notes", notesRoute);

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log("Server started on PORT: ", PORT);
  });
});
