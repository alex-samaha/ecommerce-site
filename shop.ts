/**
 * This file is the script used to simulate the shopping flow
 * for a given customer going to the store. These are the steps:
 * 1. Create a new user and sign them in
 * 2. Add a bunch of dummy items to the database so that the user can shop
 * 3. Simulate the user picking up 3 different items (adding to their cart)
 * 4. Simulate the user removing 3 of the items (removing from their cart)
 * 5. Simulate the customer leaving the store (checking out, emptying their cart)
 * 6. Simulate the customer viewing their past transactions
 * 7. Clears the database for running the script again
 */
import axios from 'axios';
import fs from 'fs';

const BASE_URL = 'http://localhost:8080';

const signUpUser = async (email: string) => {
    await axios.post(`${BASE_URL}/signup`, { email });
};

const addItemsToDB = async () => {
    const items = JSON.parse(fs.readFileSync('sample-inventory.json', 'utf-8'));
    await axios.post(`${BASE_URL}/add-items`, { ...items });
    console.log("====Items Added to DB====\n");
};

const enterStore = async (email: string) => {
    const { data: { sessionId } } = await axios.post(`${BASE_URL}/signin`, { email });
    console.log("===============================");
    console.log("Session ID: ", sessionId);
    console.log("===============================\n");
    return sessionId;
};

const addItemToCart = async (sessionId: string, itemId: string) => {
    const { data: { cart }} = await axios.post(`${BASE_URL}/item/${itemId}/add`, {}, {
        headers: {
            Authorization: sessionId
        }
    });
    console.log("===============================");
    console.log("Added to User Cart: ", cart);
    console.log("===============================\n");
};

const removeItemFromCart = async (sessionId: string, itemId: string) => {
    const { data: { cart }} = await axios.post(`${BASE_URL}/item/${itemId}/remove`, {}, {
        headers: {
            Authorization: sessionId
        }
    });
    console.log("===============================");
    console.log("Removed from User Cart: ", cart);
    console.log("===============================\n");
};

const checkout = async (sessionId: string) => {
    const { data: { transaction }} = await axios.post(`${BASE_URL}/checkout`, {}, {
        headers: {
            Authorization: sessionId
        }
    });
    console.log("===============================");
    console.log("User Checked Out (Transaction): %j", transaction);
    console.log("===============================\n");
}

const viewTransactions = async (sessionId: string) => {
    const { data: { transactions }} = await axios.get(`${BASE_URL}/transactions`, {
        headers: {
            Authorization: sessionId
        }
    });

    console.log("===============================");
    console.log("Past User Transaction: %j", transactions);
    console.log("===============================\n");

};

const clearDB = async () => {
    await axios.post(`${BASE_URL}/drop-collections`);
    console.log("====Cleared Database====");
}

const sleep = (milliseconds: number) =>{
    return new Promise((resolve) => {
      setTimeout(resolve, milliseconds);
    });
}

const simulateShopping = async () => {
    // signup user
    const email = 'test15@test.com';
    await signUpUser(email);

    // Add test data to the DB
    await addItemsToDB();

    // Enter the store
    const sessionId = await enterStore(email);

    // sleep to let the data get processed
    await sleep(2000);
    // Add items to the cart
    await addItemToCart(sessionId, '1');
    await sleep(1000);
    await addItemToCart(sessionId, '1');
    await sleep(1000);
    await addItemToCart(sessionId, '2');
    await sleep(1000);
    await addItemToCart(sessionId, '2');
    await sleep(1000);
    await addItemToCart(sessionId, '3');
    await sleep(1000);
    await addItemToCart(sessionId, '3');
    await sleep(1000);

    // Remove items from the cart
    await removeItemFromCart(sessionId, '1');
    await sleep(1000);
    await removeItemFromCart(sessionId, '2');
    await sleep(1000);
    await removeItemFromCart(sessionId, '3');
    await sleep(1000);

    // Leave the store and checkout
    await checkout(sessionId);
    await sleep(1000);

    // View the past transaction
    // Calling entore store again to get a new sessionId
    const newSessionId = await enterStore(email);
    await viewTransactions(newSessionId);

    // Clear the databse for any subsequent runs
    await clearDB();
};

simulateShopping();
