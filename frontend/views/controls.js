const btnSearch = document.getElementById("btnSearch").addEventListener("click", () => onSearch());

console.log("Attached");

function onSearch() {
    
const inputText =  document.getElementById("inputSearch").value;
 console.log("Searched " + inputText);
}