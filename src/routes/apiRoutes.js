import { Router } from "express";

import exampleController from '../controllers/exampleController'

const router = Router()

router.get('/', exampleController.helloWorld)

export default router