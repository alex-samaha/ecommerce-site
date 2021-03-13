import express from 'express';
import { validateRequest } from '../middlewares/validate-request';
import { signIn, signUp, checkout } from '../controllers/user-controller';
import { addItemsToDB, addItemToCart } from '../controllers/inventory-controller';

const router = express.Router();

router.post('/signin', signIn);

router.post('/signup', signUp);

router.post('/checkout', validateRequest, checkout);

router.post('/add-items',addItemsToDB);

router.get('/item/:id/add', validateRequest, addItemToCart);


export { router };