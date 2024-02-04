# Blog Application: Server
Clone the repository or download the zip file for the code and open it in editor of your choice. 

Packages required:
 1. Express
 2. CORS
 3. dotenv
 4. Mongoose
 5. Multer
 6. Cloudinary
 7. Nodemon(optional)

Open up the terminal and run `npm install` to install all the required dependencies.

## Environment Setup
You will need to provide 6 env variables, they are listed below:

 1. MONGO_URI
 2. CLOUDINARY_CLOUD_NAME
 3. CLOUDINARY_API_KEY
 4. CLOUDINARY_API_SECRET
 5. API_SECRET: this is for very basic authentication and should be same in both, the server and the [client](https://github.com/KrishangSharma/blog-client) It is important to note that you won't be able to interact with the server, because of the `API_SECRET`.
 6. PORT(optional, defaults to 3000)

After setting up the variables, you can now start the dev server with `npm run dev`, if everything was set up correctly, you will see:
```
> dev
> nodemon index.js

[nodemon] 3.0.2
[nodemon] to restart at any time, enter `rs`
[nodemon] watching path(s): *.*
[nodemon] watching extensions: js,mjs,cjs,json
[nodemon] starting `node index.js`
Server running on port: 3000
Database connected
```
Now you can open up an API Client of your choice and start making requests:

### Available Routes
*Important Note*: All routes should be originating from localhost:3000 and must have an `api-key` header attached to them, which should be equal to the value of your environment variable API_SECRET.

 1. `/upload`: add all the required data to post a blog
 2. `/get/all`: retrieves all blogs from the collection
 3. `/get/:id`: get a specific blog by ID
 4. `/delete/:id`: delete a blog using it's ID.
