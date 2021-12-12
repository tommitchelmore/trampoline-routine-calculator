import { Router } from "express";
import accessControl from "../../middleware/accessControl";
import skillController from "../controllers/skillController";

const router = Router()
router.use(accessControl.isContributor)

router.post('/skill', skillController.create)
router.patch('/skill', skillController.update)
router.delete('/skill', skillController.delete)

export default router