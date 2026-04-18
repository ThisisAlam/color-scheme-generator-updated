let colorDetailsArray = []
let colorValuesArr = []
let schemeResult = []
const colorPicker = document.getElementById('color-picker');
const schemeSelect = document.getElementById('colors');
const generateBtn = document.getElementById('generate-btn');
const colorScheme = document.getElementById('color-scheme');
const colorHex = document.getElementById('color-scheme-hex');

function rendercolors(colorArr){
    let html1 = '';
    let html2 = '';
    colorArr.forEach(value => {
        html1 += 
         `<div class="color-card" style="background-color: ${value};">
         </div>`
        html2 += 
         `<p class="hex-code">${value}</p>`
    })
    colorScheme.innerHTML = html1;
    colorHex.innerHTML = html2;
}

function schemeHandler(scheme, colorValuesArr){
    if(scheme === 'monochrome'){
        console.log('Monochrome scheme selected');
        return colorValuesArr
    }else if(scheme === 'monochrome-dark'){
        console.log('Monochrome-dark scheme selected');
        return colorValuesArr.slice(0,4);
    }else if(scheme === 'monochrome-light'){
        console.log('Monochrome-light scheme selected');
        return colorValuesArr.slice(2,6);
    }else if(scheme === 'analogic'){
        console.log('Analogic scheme selected');
        return colorValuesArr
    }else if(scheme === 'complement'){
        console.log('Complement scheme selected');
        return colorValuesArr.slice(1,3);
    }else if(scheme === 'triad'){
        console.log('Triad scheme selected');
        return colorValuesArr.slice(1,4);
    }else if(scheme === 'quad'){ 
        console.log('Quad scheme selected');
        return colorValuesArr.slice(0,4);
    }else {
        console.log('Invalid scheme selected');
    } 
}
function fetchColors(color, scheme){
    fetch(`https://www.thecolorapi.com/scheme?hex=${color}&mode=${scheme}&count=6`)
        .then(response => response.json())
        .then(data => {
            colorDetailsArray = data.colors;
            colorDetailsArray.filter((color) => {
                if(colorValuesArr.length === 6){
                    colorValuesArr = [];
                    colorValuesArr.push(color.hex.value)
                }else {
                    colorValuesArr.push(color.hex.value)
                }
            })
            console.log(colorValuesArr);
            schemeResult = schemeHandler(scheme, colorValuesArr)
            console.log(schemeResult);
            rendercolors(schemeResult);
        })
}
let color = colorPicker.value.slice(1);
let scheme = schemeSelect.value;
fetchColors(color, scheme)
generateBtn.addEventListener('click', async (e) => {
    e.preventDefault();
    let color = colorPicker.value.slice(1);
    let scheme = schemeSelect.value;
    fetchColors(color, scheme)
});