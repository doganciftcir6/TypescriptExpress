import { Router } from "express";
import appUserController from "../controllers/appUserController";
import validateToken from "../middlewares/userMiddlewares/authMidleware";

const router = Router();

router.get("/GetAll", validateToken,appUserController.getAllAppUsers);
router.get("/GetById/:id", validateToken,appUserController.getAppUser);

export default router;