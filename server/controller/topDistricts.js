const fs=require("fs")
const path=require("path")
const file=path.join(__dirname,"Covid_Data.json")

const topDistricts=async(req,res)=>{
    try{


        let innerHTML=`<table boreder="1" cellPadding="10" cellSpacing="10">
                            <thead>
                                <tr>
                                    <th>State</th>
                                    <th>District</th>
                                    <th>Infected</th>
                                    <th>Recovered</th>
                                    <th>Vaccinated</th>
                                </tr>
                            <thead/>`

        const {name}=req.body;
        let data=fs.readFileSync(file);
        data=JSON.parse(data);
        let state=[];
        for(i=0;i<data.length;i++){
            if(data[i].State===name){
                state.push(data[i])
            }
        }
        for(i=0;i<state.length-1;i++){
            for(j=i+1;j<state.length;j++){
                if(state[i].Vaccinated<state[j].Vaccinated){
                    const {State,District,Infected,Recovered,Vaccinated}=state[i];
                    state[i]=state[j];
                    state[j]={State,District,Infected,Recovered,Vaccinated};
                }
            }
        }
        for(i=0;i<state.length;i++){
            innerHTML+=`<tr>
                            <td>${state[i].State}</td>
                            <td>${state[i].District}</td>
                            <td>${state[i].Infected}</td>
                            <td>${state[i].Recovered}</td>
                            <td>${state[i].Vaccinated}</td>
                        <tr/>`
        }
        innerHTML+="</table>"
        res.writeHead(200, { 'Content-Type':'text/html'});
        res.end(innerHTML);
    }catch(err){
        console.log(err);
    }
}
module.exports={topDistricts}