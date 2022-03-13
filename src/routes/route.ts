import { Router } from "express";

import * as testController from "../controllers/testController";
import * as userController from "../controllers/userController";

const router = Router()

router.get('/ping', testController.pong)

router.post('/singup', userController.singup)
router.post('/singin', userController.singin)


export default router;