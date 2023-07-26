import express, { Router } from "express";
import categoryController from "../controllers/categoryController";

const router = Router();

router.get("/GetAll", categoryController.getAllCategories);
router.get("/GetById/:id", categoryController.getCategoryById);
router.post("/Insert", categoryController.insertCategory);
router.put("/Update", categoryController.updateCatgory);
router.delete("/Delete/:id", categoryController.deleteCategory);

export default router;
