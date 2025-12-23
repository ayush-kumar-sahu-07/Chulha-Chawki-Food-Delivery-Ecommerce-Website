const express = require("express");
const path=require("path");
const { handleUserSignup,handleUserLogin,changepassword,redirecttochangepassword,redirecttodelete,deleteaccount} = require("../Backend/controllers/auth");
const { connectToMongoDB } = require("../Backend/connect");
const PORT = 3000;
const app = express();

connectToMongoDB("mongodb://127.0.0.1:27017/food-delivery")
  .then(() => console.log("MongoDB Connected"));
  

app.set('view engine','ejs'); // view engines
app.set('views',path.join(__dirname,'Backend/views'))
app.use(express.json()); // middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

// Route for handling signup
app.post('/signup', handleUserSignup);

// Route for handling
app.post('/login',handleUserLogin);


app.get('/change-password',redirecttochangepassword);

app.post('/change-password',changepassword);

app.get("/delete-account",redirecttodelete);

app.post('/delete-account',deleteaccount);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

