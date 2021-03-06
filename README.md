# App Setup
## Mac
* Clone this repo from the command line - `git clone https://github.com/alex-samaha/ecommerce-site.git`
* Install MongoDB locally - https://www.mongodb.com/try/download/community (or install via brew - `brew install mongodb-community@4.4`) - This app was developed using version 4.4.4
* If not using brew, run it locally with this command - `mongod --config /usr/local/etc/mongod.conf --fork`
* If using brew, run these commands - `brew tap mongodb/brew` and then `brew services start mongodb-community@4.4`
* If ts-node isn't installed, install it globally - `npm install -g ts-node`
* Once MongoDB is installed and running, install the node_modules from the root directory of the project - `npm install`
* Start the application - `npm start`
* Run the shopping script from the root directory to simulate the shopping flow - `ts-node shop.ts`
* Test any routes as needed, and refer to the postman collection if necessary - Storelift E-Commerce Site.postman_collection.json
* Make sure to use the "Add Items to DB endpoint" (/add-items) to add inventory so that you can test the shopping flow if needed
* You can also clear the DB using the "Clear Database" endpoint (/drop-collections) for testing as well
## Windows
* Clone this repo from the command line - `git clone https://github.com/alex-samaha/ecommerce-site.git`
* Install MongoDB locally - https://www.mongodb.com/try/download/community - This app was developed using version 4.4.4
* Download the .msi file and go through with the installation
* Add the data db folder to your computer at the root of your C Drive - `mkdir data ... cd data ... mkdir db` or simply add the folders manually from the file explorer
* Change into the bin directory of mongodb - `cd "C:\Program Files\MongoDB\Server\4.4\bin"` or alternatively go to that directrory in the file explorer
* Run the mongod.exe executable `./mongod.exe` (`start mongod.exe` if using cmd) or double click the .exe file
* If ts-node isn't installed, install it globally - `npm install -g ts-node`
* Once MongoDB is installed and running, install the node_modules from the root directory of the project - `npm install`
* Start the application - `npm start`
* Run the shopping script from the root directory to simulate the shopping flow - `ts-node shop.ts`
* Test any routes as needed, and refer to the postman collection if necessary - Storelift E-Commerce Site.postman_collection.json
* Make sure to use the "Add Items to DB endpoint" (/add-items) to add inventory so that you can test the shopping flow if needed
* You can also clear the DB using the "Clear Database" endpoint (/drop-collections) for testing as well

## Notes
* When running the shopping script make sure that the database is already clear, or at least make sure that the default test user isn't already created
* Signup is only for account creation and does not issue a session token (to try and keep that logic to signin which is for when a user enters the store)
* If hitting the API from postman or some REST client like that, feel free to use the "Clear Database" after you go through the shopping flow


# Routes
| Method | Route            | Required Fields                                                | Response                                      | Description                                                              |
|--------|------------------|----------------------------------------------------------------|-----------------------------------------------|--------------------------------------------------------------------------|
| POST   | /signin          | Body - email                                                   | Returns session token                         | User enters store and is given the session token                         |
| POST   | /signup          | Body - email                                                   | Returns session token                         | Signs user up and gives back the session token; for user creation mainly |
| POST   | /add-items       | Body - items JSON array                                        | Returns if successful                         | Test route for adding items to the inventory                             |
| POST   | /item/:id/add    | Header - Authorization: session token <br/> Path parameter - Item ID | Returns the contents of the user's cart       | User adds an item to their cart                                          |
| POST   | /item/:id/remove | Header - Authorization: session token <br/> Path parameter - Item ID | Returns the contents of the user's cart       | User removes an item from their cart                                     |
| POST   | /checkout        | Header - Authorization: session token                          | Returns the information about the transaction | User leaves the store and checks out                                     |
| GET    | /transactions    | Header - Authorization: session token                          | Returns all the user's past transactions      | For the user to view their past transactions                             |
