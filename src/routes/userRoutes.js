import { Router } from "express";
import accessControl from "../middleware/accessControl";
import skillController from "../controllers/skillController";

const router = Router()
router.use(accessControl.isSignedIn)

router.get('/skill', skillController.read)

export default router