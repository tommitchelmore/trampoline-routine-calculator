import { Router } from "express";
import { resolve } from "path";

const router = Router()

router.get('*', (req, res) => res.sendFile('index.html', { root: resolve(__dirname, './../client/build') }))

export default router