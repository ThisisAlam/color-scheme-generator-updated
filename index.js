let colorDetailsArray = []
let colorValuesArr = []
const colorPicker = document.getElementById('color-picker');
const schemeSelect = document.getElementById('colors');
const generateBtn = document.getElementById('generate-btn');
const colorScheme = document.getElementById('color-scheme');
const colorHex = document.getElementById('color-scheme-hex');

function rendercolors(colorArr){
    let html1 = '';
    let html2 = '';
    colorArr.forEach((value) => {
        html1 += 
         `<div id="color-card" style="background-color: ${value};">
          </div>`;
        html2 += 
         `<p id="hex-code">${value}</p>`
    })
    colorScheme.innerHTML = html1;
    colorHex.innerHTML = html2;
}
function fetchColors(){

}
generateBtn.addEventListener('click', async (e) => {
    e.preventDefault();
    console.log(colorPicker.value)
    console.log(schemeSelect.value)
    fetch(`https://www.thecolorapi.com/scheme?hex=${colorPicker.value.slice(1)}&mode=${schemeSelect.value}&count=6`)
        .then(response => response.json())
        .then(data => {
            colorDetailsArray = data.colors;
            console.log(colorDetailsArray);
            colorDetailsArray.filter((color) => {
                if(colorValuesArr.length === 6){
                    colorValuesArr = [];
                    colorValuesArr.push(color.hex.value)
                }else {
                    colorValuesArr.push(color.hex.value)
                }
            })
            rendercolors(colorValuesArr);
            console.log(colorValuesArr);
        })
});