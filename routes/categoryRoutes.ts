import { Router } from "express";
import categoryController from "../controllers/categoryController";
import validateToken from "../middlewares/userMiddlewares/authMidleware";

const router = Router();

router.get("/GetAll", validateToken,categoryController.getAllCategories);
router.get("/GetById/:id", categoryController.getCategoryById);
router.post("/Insert", categoryController.insertCategory);
router.put("/Update", categoryController.updateCatgory);
router.delete("/Delete/:id", categoryController.deleteCategory);

export default router;
