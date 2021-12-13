import { Router } from "express";

import authController from '../controllers/authController'

const router = Router()

router.post('/register', authController.register)
router.post('/signin', authController.signIn)
router.post('/signout', authController.signOut)
router.post('/confirm', authController.confirmEmail)
router.delete('/deleteAccount', authController.deleteAccount)

export default router