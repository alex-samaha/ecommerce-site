import express from 'express';
import { validateRequest } from '../middlewares/validate-request';
import { signIn, signUp } from '../controllers/user-controller';
import { addItemsToDB, addItemToCart, removeItemFromCart } from '../controllers/inventory-controller';
import { checkout, getPastTransactions } from '../controllers/transaction-controller';
import { dropAllCollections } from '../controllers/admin-controller';

const router = express.Router();

router.post('/signin', signIn);

router.post('/signup', signUp);

router.post('/add-items', addItemsToDB);

router.post('/item/:id/add', validateRequest, addItemToCart);

router.post('/item/:id/remove', validateRequest, removeItemFromCart);

router.get('/transactions', validateRequest, getPastTransactions);

router.post('/checkout', validateRequest, checkout);

router.post('/drop-collections', dropAllCollections);


export { router };