import { Router } from "express";

import * as testController from "../controllers/testController";

const router = Router()

router.get('/ping', testController.pong)

export default router;