import { Router } from "express";
import accessControl from "../middleware/accessControl";

const router = Router()
router.use(accessControl.isSignedIn)

export default router