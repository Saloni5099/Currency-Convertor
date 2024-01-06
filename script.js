
const populate = async(value,currency) => {
    let myStr = ""
    const apiUrl = "https://api.currencyapi.com/v3/latest?apikey=cur_live_dHyvHMrUnLgDN0CZST2oKlizfWkMW9VvH4Tr0w59&base_currency"+currency;
    
    try {
        let response = await fetch(apiUrl);

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

let rJson = await response.json()
document.querySelector(".output").style.display = "block";
for(let key in rJson["data"]){
    myStr += `
    <tr>
    <td>${key}</td>
    <td>${rJson["data"][key]["code"]}</td>
    <td>${Math.round(rJson["data"][key]["value"]*value)}</td>
    </tr>
    `;
}

const tableBody = document.querySelector("tbody");
tableBody.innerHTML = myStr;
}catch (error) {
    console.error("Error fetching data:", error);
    // Handle the error appropriately, e.g., display an error message to the user
}
};
const btn = document.querySelector(".btn")
btn.addEventListener("click",(e)=>{
    e.preventDefault()
    const value = parseInt(document.querySelector("input[name = 'quantity']").value);
    const currency = document.querySelector("select[name = 'currency']").value
    populate(value,currency);
});
