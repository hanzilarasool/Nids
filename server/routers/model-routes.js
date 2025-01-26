const router=require("express").Router();

const {randomForestInference}=require("../controllers/model-controller");

router.post("/detect",(req,res,next)=>{console.log("middleware executedd") ;
    next()} ,randomForestInference);

module.exports=router;