const express=require("express")
const userRoutes=require("./route/router")
const bodyParser=require("body-parser")

const app=express()

app.use(bodyParser.json())
app.use(express.urlencoded({extended:false}));

app.use("/",userRoutes);

app.listen(5000,()=>{
    console.log("server started");
});
