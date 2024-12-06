const baseUrl= "https://hexarate.paikama.co/api/rates/latest/USD?target=GBP"


const dropdowns= document.querySelectorAll(".dropdown select");


for(let select of dropdowns){
    for (curr in countryList){
        let newop= document.createElement("option")
        newop.innerText=curr
        newop.value=curr
        
        if (select.name==="From" &&curr==="USD"){
            newop.selected="selected"
        }
        else if (select.name==="To" &&curr==="INR"){
            newop.selected="selected"
        }
        select.append(newop);
    }
    select.addEventListener("change", (e)=>{
        updateFlag(e.target)
    })
}

// for(let select of dropdowns){
//     for(let i of select){
//         let code=console.log(i.innerHTML)
//     }
// }

function updateFlag(element){
    let img= element.parentElement.querySelector("img")
    let c_code=countryList[element.value]
    img.src="https://flagsapi.com/"+c_code+"/flat/64.png"
}

const btn= document.getElementById("btn");
btn.addEventListener("click",(e)=>{
    e.preventDefault();
    convert()
    
})

async function convert() {
    let inpcurr
    let excurr
    let inp=document.getElementById("inpamt").value
    for(let select of dropdowns){
        if(select.name==="From"){
            inpcurr=select.value           
        }
        if(select.name==="To"){
            excurr=select.value           
        }
    }
    let response= await fetch("https://hexarate.paikama.co/api/rates/latest/"+inpcurr+"?target="+excurr)
    let currdata= await response.json()
    let out= inp*currdata.data["mid"]
    document.getElementById("examt").value=out;
}