import { Router } from "express";
import skillController from "../controllers/skillController";

const router = Router()

router.get('/skill', skillController.read)

export default router