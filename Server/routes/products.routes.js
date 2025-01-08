import { Router } from "express";
import { fetchProducts } from "../controllers/products.controller.js";

const router=Router();


router.get('/products/:id',fetchProducts);

export default router;

