import { Router } from "express";
import accessControl from "../middleware/accessControl";
import userController from "../controllers/userController";

const router = Router()
router.use(accessControl.isSignedIn)

router.get('/me', userController.getSelf)

export default router