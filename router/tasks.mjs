// const express = require("express");
import express from "express";
import {
  getAllTasks,
  createTasks,
  getSingleTask,
  updateTasks,
  deleteTasks
} from "../controllers/tasks.mjs";
const router = express.Router();

router.get("/", getAllTasks);

router.post("/", createTasks);

router.get("/:id", getSingleTask);

router.patch("/:id", updateTasks);

router.delete("/:id", deleteTasks);

export default router;
