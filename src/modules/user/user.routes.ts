import express from "express";
import { userController } from "./user.controller";
import auth from "../../middleware/auth";

const router = express.Router();

const { createUser, getUser, getSingleUser, updateUser, deleteUser } =
  userController;

router.post("/", createUser);
router.get("/", auth("admin"), getUser);
router.get("/:id", auth("admin", "user"), getSingleUser);
router.put("/:id", auth("admin", "user"), updateUser);
router.delete("/:id", auth("admin", "user"), deleteUser);

export const userRoutes = router;
