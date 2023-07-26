import { Router } from "express";
import productCategoryController from "../controllers/productCategoryController";

const router = Router();

router.get("/GetAll", productCategoryController.getAllProductCategories);
router.get("/GetById/:id", productCategoryController.getProductCategoryById);
router.post("/Insert", productCategoryController.insertProductCategory);
router.put("/Update", productCategoryController.updateProductCategory);
router.delete("/Delete/:id", productCategoryController.deleteProductCategory);

export default router;