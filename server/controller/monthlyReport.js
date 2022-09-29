const fs=require("fs")
const path=require("path")
const file=path.join(__dirname,"Covid_Data.json")

const monthlyReport = async (req,res) => {
    try{
        const {State}=req.body;
        let data=await fs.readFileSync(file);
        data=JSON.parse(data);
        let infected=0,recovered=0;
        for(i=0;i<data.length;i++){
            if(data[i].State===State){
                infected+=Number(data[i].Infected);
                recovered+=Number(data[i].Recovered);
            }
        }
        res.status(200).send(`The monthly infected people in ${State} are ${infected} and monthly recovered people in ${State} are ${recovered}`)
    }catch(err){
        console.log(err);
    }
}
module.exports={monthlyReport}