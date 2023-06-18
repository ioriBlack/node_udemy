// const express = require("express");
import path from "path";
import express from "express";
import taskRouter from "./router/tasks.mjs";
import { connectDB } from "./db/connect.mjs";
import env from "dotenv";
env.config();

const app = express();
app.use(express.static("public"));
app.use(express.json());

import cors from "cors";
app.use(cors({
  origin: "*"
}));

app.use("/api/v1/tasks", taskRouter);
app.get("*", function (req, res) {
  const indexHtml = path.resolve("public", "index.html");
  res.sendFile(indexHtml);
})
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
  } catch (error) {
    console.log(error);
  }
}
start();

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server start: localhost:${PORT}`);
});
