import { Router } from "express";
import accessControl from "../../middleware/accessControl";

const router = Router()
router.use(accessControl.isAdmin)

router.get('/admin', (req, res) => {
  res.send("Hello!")
})

export default router