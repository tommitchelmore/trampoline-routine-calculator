import { Router } from "express";

const router = Router()

router.get('/', (req, res) => res.json({'message': 'Trampoline Routine Calculator API'}))

export default router