# App Setup
## Mac
## Windows


# Routes
| Method | Route            | Required Fields                                                | Response                                      | Description                                                              |
|--------|------------------|----------------------------------------------------------------|-----------------------------------------------|--------------------------------------------------------------------------|
| POST   | /signin          | body - email                                                   | Returns session token                         | User enters store and is given the session token                         |
| POST   | /signup          | body - email                                                   | Returns session token                         | Signs user up and gives back the session token; for user creation mainly |
| POST   | /add-items       | body - items JSON array                                        | Returns if successful                         | Test route for adding items to the inventory                             |
| POST   | /item/:id/add    | Header - Authorization: session token Path parameter - Item ID | Returns the contents of the user's cart       | User adds an item to their cart                                          |
| POST   | /item/:id/remove | Header - Authorization: session token Path parameter - Item ID | Returns the contents of the user's cart       | User removes an item from their cart                                     |
| POST   | /checkout        | Header - Authorization: session token                          | Returns the information about the transaction | User leaves the store and checks out                                     |
| GET    | /transactions    | Header - Authorization: session token                          | Returns all the user's past transactions      | For the user to view their past transactions                             |
