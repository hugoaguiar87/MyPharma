import { Router } from "express";

import { privateRoute } from "../config/authConfig";

import * as testController from "../controllers/testController";
import * as userController from "../controllers/userController";
import * as productCategoryController from "../controllers/productCategoryController";
import * as brandController from "../controllers/brandController";
import * as productController from "../controllers/productController";

const router = Router()

router.get('/ping', testController.pong)

router.post('/singup', userController.singup)
router.post('/singin', userController.singin)

router.get('/categories', productCategoryController.getCategories)
router.post('/category/create', privateRoute, productCategoryController.createProductCategory)
router.put('/category/edit', privateRoute, productCategoryController.editProductCategory)
router.delete('/category/delete', privateRoute, productCategoryController.deleteProductCategory)

router.get('/brands', brandController.getBrands)
router.post('/brand/create', privateRoute, brandController.createBrand)
router.put('/brand/edit', privateRoute, brandController.editBrand)
router.delete('/brand/delete', privateRoute, brandController.deleteBrand)

router.post('/product/create', privateRoute, productController.createProduct)
router.put('/product/edit', privateRoute, productController.editProduct)
router.delete('/product/delete', privateRoute, productController.deleteProduct)



export default router;