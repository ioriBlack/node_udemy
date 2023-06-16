// const express = require("express");
import express from "express";
import taskRouter from "./router/tasks.mjs";
import { connectDB } from "./db/connect.mjs";
import env from "dotenv";
env.config();

const app = express();
app.use(express.json());
app.use("/api/v1/tasks", taskRouter);
app.use(express.static("./public"));
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
