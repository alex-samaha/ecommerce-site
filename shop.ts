/**
 * This file is the script used to simulate the shopping flow
 * for a given customer going to the store. These are the steps:
 * 1. Create a new user/sign them in
 * 2. Add a bunch of dummy items to the database so that the user can shop
 * 3. Simulate the user picking up 3 different items (adding to their cart)
 * 4. Simulate the user removing 1 of the items (removing from their cart)
 * 5. Simulate the customer leaving the store (checking out, emptying their cart)
 * 6. Allow the customer to view their past transactions
 */
import axios from 'axios';
import fs from 'fs';

const BASE_URL = 'http://localhost:8080';

const signUpUser = async () => {
    const { data: { sessionId } } = await axios.post(`${BASE_URL}/signup`, { email: 'test123@test.com' });
    console.log("Session ID: ", sessionId);
    return sessionId; 
};

const addItemsToDB = async () => {
    const items = JSON.parse(fs.readFileSync('sample-inventory.json', 'utf-8'));
    console.log("Items: ", items);
    await axios.post(`${BASE_URL}/add-items`, { ...items });
}

//const session = signUpUser();
//addItemsToDB();