import { Router } from "express";
import { resolve } from "path"

const router = Router()

router.get('/', (req, res) => {
    res.send("Hello!")
})

/*
OR TO SERVE AN SPA FROM /client/build (ie React, Vue, etc)

router.get('*', (req, res) => {
    res.sendFile('index.html', { root: resolve(__dirname, './../client/build') })
})
*/

export default router