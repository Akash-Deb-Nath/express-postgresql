import express, { Request, Response } from "express";
import { todoController } from "./todo.controller";

const router = express.Router();

const { createTodo, getTodo, getSingleTodo, updateTodo, deleteTodo } =
  todoController;

router.post("/", createTodo);
router.get("/", getTodo);
router.get("/:id", getSingleTodo);
router.put("/:id", updateTodo);
router.delete("/:id", deleteTodo);

export const todoRoutes = router;
