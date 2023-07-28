import { Router } from "express";
import categoryController from "../controllers/categoryController";
import validateToken from "../middlewares/userMiddlewares/authMidleware";

const router = Router();

router.get("/GetAll", validateToken,categoryController.getAllCategories);
router.get("/GetById/:id", validateToken, categoryController.getCategoryById);
router.post("/Insert", validateToken,categoryController.insertCategory);
router.put("/Update", validateToken,categoryController.updateCatgory);
router.delete("/Delete/:id", validateToken,categoryController.deleteCategory);

export default router;
