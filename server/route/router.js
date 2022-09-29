const express=require("express")
const router=express.Router();

const {top10}=require("../controller/top10")
const {monthlyReport}=require("../controller/monthlyReport")
const {topDistricts}=require("../controller/topDistricts")

router.post("/top10",top10);
router.post("/monthlyReport",monthlyReport)
router.post("/topDistricts",topDistricts);

module.exports=router;
