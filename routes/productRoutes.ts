import express from "express";
import productController from "../controllers/productcontroller"

const router = express.Router();

router.get("/GetAll", productController.getAllProducts);
router.get("/GetById/:id", productController.getProductById);
router.post("/Insert", productController.insertProduct);
router.put("/Update", productController.updateProduct);
router.delete("/Delete/:id", productController.deleteProduct);

export default router;