import express from "express";
import {
  Login,
  LogOut,
  Register,
  UserExist,
} from "../controller/userController.js";
import { verifyToken } from "../middleware/Auth.js";

const route = express.Router();

route.post("/register", Register);
route.post("/login", Login);
route.post("/logout", LogOut);

route.get("/user", verifyToken, UserExist); //add new

export default route;
