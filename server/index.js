const express=require("express");
const app=express();
const cors=require("cors");
const {spawn}=require("child_process")
require("dotenv").config();
const path=require("path");

const connectDB=require("./utils/db")

connectDB();

app.use(express.json());
app.use(cors());
// Serve static files from the "python-scripts" folder
app.use('/python-scripts', express.static(path.join(__dirname, 'python-scripts')));
// python child process


// middleware for routes specificaton-
app.use("/api/user",require("./routers/user-routes"));
app.use("/api/model",require("./routers/model-routes"));

// logger function which will log the request method and request url made by the user to the -server console

app.use((req,res,next)=>{
    console.log("request method",req.method, "request url",req.url);
    next();
}) 
// Error-handling middleware
app.use((err, req, res, next) => {
    if (err.name === 'ValidationError') {
      return res.status(400).json({ message: err.message });
    }
    res.status(500).json({ message: 'Server error' });
  });
  
// default route to check if the server is running successfully

app.get("/",(req,res)=>{
    res.send("Ids model backend is running successfully");
}
);



// listen to the server on some port- process.env.PORT is used to get the port number from the environment variable file .env 
app.listen(process.env.PORT,()=>{
    console.log(`Server is running on port ${process.env.PORT}`);
});

