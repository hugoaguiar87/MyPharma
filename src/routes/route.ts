import { Router } from "express";

import { privateRoute } from "../config/authConfig";

import * as testController from "../controllers/testController";
import * as userController from "../controllers/userController";
import * as productCategoryController from "../controllers/productCategoryController";

const router = Router()

router.get('/ping', testController.pong)

router.post('/singup', userController.singup)
router.post('/singin', userController.singin)

router.post('/category/create', privateRoute, productCategoryController.createProductCategory)
router.put('/category/edit', privateRoute, productCategoryController.editProductCategory)
router.delete('/category/delete', privateRoute, productCategoryController.deleteProductCategory)



export default router;