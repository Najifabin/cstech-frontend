# MERN Project - Steps to bBuild Project
# Front End - React Application


1. Create react app using Vite: npm create vite@latest project-name -- --template react
2. Remove unwanted code from existing project(App.jsx, App.css, index.css)
3. Install & configure Libraries we need for our project (Styling libraries : Tailwind css / React Bootstrap)
4. Create pages & components for designing the project
5. Set route for each pages / components : install configure library - 'react-router-dom' (BrowserRouter, Routes, Route)
6. Set up API call to server inorder to resolve user request - install axios method used to make api call using axios is : 'axios(reqConfig) method' , according to 'reqConfig' it can make get, post, put & delete request. project only have a single api then use axios.http-request() method
7. To display result of api call using axios : check status of api call result, if it is 200/success then use reasult.data as server response otherwise result.response.data is the server response.

# Back End - Express JS & MongoDB

# MongoDB Atlas - Data permenantly stored in cloud
1. Create database in the existing cluster, Inside Atlas bashboard, go to clusters -> Browse collection -> Create database -> provide db name & a collection name -> click create button
2. Get the connection string MongoDB Atlas Database : Inside Atlas Dashboard, go to clusters -> connect -> connect to your application 'Drivers' -> copy connection string to use in node application 
ex:mongodb+srv://<db-username>1:<db-password>@cluster0.xi603.mongodb.net/<database-name>?retryWrites=true&w=majority&appName=Cluster0


# Express JS - Used to create server for web application and resolve client/frontend request with  help of database

1. Create folder for server
2. Create package.json file using : npm init -y
3. Install all necessary packages for server creation : express, cors, dotenv, mongoose, jsonwebtoken(for authentication/login feature)
4. Create file .env & .gitignore
5. Create index.js file for running server application
6. Steps to do in index.js file for creating express server
  - import dotenv, express, cors
  - Create express server using method : express()
  - Use cors() & express.json() in express server
  - Create PORT number where express app can view in browser
  - Listen the port of express server for client request
  - Run the express server app using command : node / nodemon index.js
  - Set up for MongoDB Atlas connection with express server
    - Paste MongoDB atlas connection string in .env file
    - Create folder for defining db connection and create a js file inside it
    - Inside js file, define steps to connect MongoDB with express js
      - Import MongoDb
      - Get MongoDB Atlas connection_string from .env file
      - Connect MongoDB with express js using method : mongoose.connect(connection_string)
    - Set up url / route for client request / api call in server app
      - Create a folder in server app, and create js file to define url for client api call
      - Inside js file import express, controllers
      - To create route/ url in express : create object for express.Router class
      - route using object of express.Router class ex : router-class-object-http-method(path,controller-name)
      - export object of express.Router class and import in index.js
    - Set up for Controller ( Controllers are function with two arguments , one is 'request' object and another is 'response' object. Controllers used to define logic to resolve client request & communication with database model)
    - Set up model for MongoDB database collection in express server
      - Import mongoose
      - Create Schema / structure of the data to be stored in mongodb collection, for that create object of mongoose.Schema class
      - Create Model with Schema using method mongoose.model(model-name,schema-name)
      - export model



      front end user -> api call -> routes in server -> controller -> model -> model response to controller -> controller response to front end user
