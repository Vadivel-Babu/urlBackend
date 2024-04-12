import { Router } from "express";
import linkController from "../controllers/linkController.js";
//import auth from "../middleware/authmiddleware.js";

const route = Router();

route.get("/", (req, res) =>
  res.json({ message: "API working", url: req.baseUrl + "/getlinks" })
);
route.get("/getlinks", linkController.getLinks);
route.post("/postlink", linkController.postLink);
route.delete("/deletlink/:id", linkController.deleteLink);

export default route;
