import express from 'express';
import { validateRequest } from '../middlewares/validate-request';
import { signIn, signUp } from '../controllers/user-controller';
import { addItemsToDB, addItemToCart, removeItemFromCart } from '../controllers/inventory-controller';

const router = express.Router();

router.post('/signin', signIn);

router.post('/signup', signUp);

router.post('/add-items',addItemsToDB);

router.post('/item/:id/add', validateRequest, addItemToCart);

router.post('/item/:id/remove', validateRequest, removeItemFromCart);

//router.post('/checkout', validateRequest, checkout);


export { router };