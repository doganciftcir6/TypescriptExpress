import express from "express";
import productController from "../controllers/productcontroller";
import validateToken from "../middlewares/userMiddlewares/authMidleware";

const router = express.Router();

router.get("/GetAll", validateToken,productController.getAllProducts);
router.get("/GetById/:id", validateToken,productController.getProductById);
router.post("/Insert", validateToken,productController.insertProduct);
router.put("/Update", validateToken,productController.updateProduct);
router.delete("/Delete/:id", validateToken,productController.deleteProduct);

export default router;