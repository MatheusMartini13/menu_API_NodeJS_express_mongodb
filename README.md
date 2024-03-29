RESTful API to manage an online menu.

# Technologies and Dependencies:

- Javascript,
- MongoDB - noSQL Database,
- Mongoose - MongoDB object modeling,
- Express - Node web framework,
- Express-Validation - Used to check user input validations and to sanitize,
- Bcrypt - Used to encrypt the user password,
- Cors - Used to configure cross-origin requests,
- jsonwebtoken - Used to generate a token to authentication,

# DevDependencies:

- Nodemon - Used to auto restart the server
- Prettier - Used to help keep the code pretty
- Mocha - Used as a testing framework
- Chai - Used as a assertion library dor testing
- Sinon - Used to generate stubs and facilitate testing

# How to install this API:

There is two ways of using this API. 

The first one is to clone to a local repository. Using VS CODE and considering you have node already installed, you can enter in the project and in a new terminal use "npm install" and after that "npm start". Then you can send requests in your preferable way (I suggest Postman). This is interesting because you can also analyse the code.

The other way is to use the deployed version of the software:
- FrontEnd (demo): https://menu-matt.onrender.com/
- BackEnd (live): https://matt-menu.onrender.com

Note that this is a free version of two onrender deployments, so it can be very slow (and could even be offline in rush hours), and you will not be able to check the code, so it is recomended to clone the full code too. The advantage of this deployment is that it is really simple to test how the software works and there is a friendly way to check the requests. It also shows that the API accepts cross origin requests.

# How the API works:

To test the menu API you should send requests with 'application/json' in the 'Content-Type' header. You should pass all the necessary information in two ways:

- 1 - when necessary, as a param in the URL, indicated below as :productId.
- 2 - when necessary, in the request body, in a json format.

To use the system, first you have to be logged in. There is two ways to achieve this, the first one is to use a default test user, with the credentials:

```
username: admin
password: admin
```

And sending a POST request with these credentials in the body to '/auth/login'. If the server is running in your local machine, please note that the full URL should be 'http://localhost:8080/auth/login', while in the deployed version should be 'https://matt-menu.onrender.com/auth/login'.

To second way to login is to SingUp, sending a POST request to http://localhost:8080/auth/signup with a username and password in the body, in a json format. After this, you can use this new user created to login with a POST request to http://localhost:8080/auth/login and the username and password in the request body.

After login, you will recebe a response with a json object with a token. To access the other functionalities in this application, you should start sending this token in the 'Authorization' header with every new request. Remember to add "Bearer " before the token in the header, otherwise you will get authorization error.

After the token configuration, you can check the categories in the database with a GET request to http://localhost:8080/category. You will receive a json object with all the categories and, if it exists, its parents.

To check the products already registered in the database you can send a GET request to http://localhost:8080/product. It is not relevant the body in this request.

To check one specific product already registered in the database you can send a GET request to http://localhost:8080/product:productId. It is not relevant the body in this request, and remember that in the url above you should change productId with the id of the product you want to check.

> Quick Tip: You can first check all products and find the .\_id of the product you want to use in this request. Note that there is no "/" between the word product and the productId in the URL.

To create a new product you have to send a POST request to http://localhost:8080/product. In the body you should inform the fields "name", "price", "quantity" and "categories" (an array with the category names you want to add to the product).

> Quick Tip: Here you can check all the categories and find the categories you want. You should use the name of the category and not the id.

```
Example:
{
"name": " CocaCola ",
"categories": [
"Drink",
"Soda"
],
"quantity": "1",
"price": "7"
}
```

To patch a product you have to send an body in the same way when creating a product, but you should send a PATCH request and you have to add the product ID in the URL: http://localhost:8080/product/:productId.

> Quick Tip: Note that there is a "/" after product and before the productId in this URL now.

To Delete a product you should send a DELETE request to http://localhost:8080/product:productId.

> Quick Tip: Note that there is no "/" between product and the productId in the URL again.

# Extra -- Testing

If you cloned the repository to your computer you can run "npm test". 
This will run mocha and will show 3 tests verifications. 
I created these automatic tests just for the auth controller. The reason of these limitation is because it is an extra. This software is not intended to be used as a real product, so I imagined that testing just part of the software would be enough.

# Overview:

Auth:

- SignUp: POST to http://localhost:8080/auth/signup
- Login: POST to http://localhost:8080/auth/login
  -- Use the token in the Authorization header as "Bearer token"

Categories:

- Get All Categories: GET to http://localhost:8080/category

Products:

- Get All Products: GET to http://localhost:8080/product
- Get One Product: GET to http://localhost:8080/product:productId
- Post a New Product: POST to http://localhost:8080/product
- Patch a Product: PATCH to http://localhost:8080/product/:productId
- Delete a Product: DELETE to http://localhost:8080/product:productId
