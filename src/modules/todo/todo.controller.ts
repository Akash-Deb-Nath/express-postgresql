import { Request, Response } from "express";
import { pool } from "../../config/db";
import { todoServices } from "./todo.service";

const {
  createTodosInDB,
  getTodosFromDB,
  getSIngleTodoFromDB,
  updateTodoInDB,
  deleteTodoFromDB,
} = todoServices;

const createTodo = async (req: Request, res: Response) => {
  const { user_id, title } = req.body;
  try {
    const result = await createTodosInDB(user_id, title);
    res.status(201).json({
      success: true,
      message: "Todo created",
      data: result.rows[0],
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
const getTodo = async (req: Request, res: Response) => {
  try {
    const result = await getTodosFromDB();
    // console.log(result.rows[0]);
    res.status(200).json({
      success: true,
      message: "Todos retrieve successfully",
      data: result.rows,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
      details: error,
    });
  }
};
const getSingleTodo = async (req: Request, res: Response) => {
  try {
    const result = await getSIngleTodoFromDB(req.params.id as string);
    if (result.rows.length === 0) {
      res.status(404).json({
        success: false,
        message: "User not found",
      });
    } else {
      res.status(200).json({
        success: true,
        message: "Users retrieve successfully",
        data: result.rows[0],
      });
    }
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
      details: error,
    });
  }
};
const updateTodo = async (req: Request, res: Response) => {
  const { title } = req.body;
  try {
    const result = await updateTodoInDB(title, req.params.id as string);
    if (result.rows.length === 0) {
      res.status(404).json({
        success: false,
        message: "User not found",
      });
    } else {
      res.status(200).json({
        success: true,
        message: "Users updated successfully",
        data: result.rows[0],
      });
    }
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
      details: error,
    });
  }
};
const deleteTodo = async (req: Request, res: Response) => {
  try {
    const result = await deleteTodoFromDB(req.params.id as string);
    if (result.rowCount === 0) {
      res.status(404).json({
        success: false,
        message: "User not found",
      });
    } else {
      res.status(200).json({
        success: true,
        message: "User deleted successfully",
        data: null,
      });
    }
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
      details: error,
    });
  }
};

export const todoController = {
  createTodo,
  getTodo,
  getSingleTodo,
  updateTodo,
  deleteTodo,
};
