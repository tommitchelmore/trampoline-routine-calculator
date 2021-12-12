import { Router } from "express";
import accessControl from "../../middleware/accessControl";
import userController from "../controllers/userController";

const router = Router()
router.use(accessControl.isAdmin)

router.get('/user', userController.read)
router.patch('/user', userController.update)

export default router