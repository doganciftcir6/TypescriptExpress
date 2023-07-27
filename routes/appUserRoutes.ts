import { Router } from "express";
import appUserController from "../controllers/appUserController";

const router = Router();

router.get("/GetAll", appUserController.getAllAppUsers);
router.get("/GetById/:id", appUserController.getAppUser);

export default router;