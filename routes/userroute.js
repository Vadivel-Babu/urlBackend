import { Router } from "express";
import userController from "../controllers/userController.js";

const route = Router();

route.post("/signup", userController.signUp);
route.post("/login", userController.login);
route.post("/logout", userController.logout);

export default route;
