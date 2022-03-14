import { Router } from "express";

import { privateRoute } from "../config/authConfig";

import * as testController from "../controllers/testController";
import * as userController from "../controllers/userController";
import * as productCategoryController from "../controllers/productCategoryController";
import * as brandController from "../controllers/brandController";

const router = Router()

router.get('/ping', testController.pong)

router.post('/singup', userController.singup)
router.post('/singin', userController.singin)

router.get('/categories', productCategoryController.getCategories)
router.post('/category/create', privateRoute, productCategoryController.createProductCategory)
router.put('/category/edit', privateRoute, productCategoryController.editProductCategory)
router.delete('/category/delete', privateRoute, productCategoryController.deleteProductCategory)

router.post('/brand/create', privateRoute, brandController.createBrand)
router.put('/brand/edit', privateRoute, brandController.editBrand)
router.delete('/brand/delete', privateRoute, brandController.deleteBrand)



export default router;