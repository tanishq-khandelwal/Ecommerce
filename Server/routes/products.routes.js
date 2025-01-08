import { Router } from "express";
import { addProducts, fetchProducts } from "../controllers/products.controller.js";

const router=Router();


router.get('/products',fetchProducts);
router.post('/products/add',addProducts);

export default router;

