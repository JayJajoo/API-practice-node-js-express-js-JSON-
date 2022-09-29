const fs=require("fs");
const path=require("path")
const file=path.join(__dirname,"Covid_Data.json")

const top10 = async (req,res)=>{
    try{

        let innerHTML=`<table border="1" cellPadding="10" cellSpacing="10">
                            <thead>
                                <tr>
                                    <th>State</th>
                                    <th>District</th>
                                    <th>Vaccinated</th>
                                </tr>
                            <thead/>`

        let data=fs.readFileSync(file);
        data=await JSON.parse(data);
        for(i=0;i<data.length-1;i++){
            for(j = i+1;j<data.length;j++){
                if(data[i].Vaccinated<data[j].Vaccinated){
                    const {State,District,Infected,Recovered,Vaccinated}=data[i];
                    data[i]=data[j];
                    data[j]={State,District,Infected,Recovered,Vaccinated};
                }
            }
        }
        data=data.slice(0,10);
        for(i=0;i<10;i++){
            innerHTML+=`<tr>
                            <td>${data[i].State}</td>
                            <td>${data[i].District}</td>
                            <td>${data[i].Vaccinated}</td>
                        </tr>`
        }
        innerHTML+="</table>"
        res.writeHead(200, { 'Content-Type':'text/html'});
        res.end(innerHTML);
    }catch(err){
        console.log(err);
    }
}

module.exports={top10}