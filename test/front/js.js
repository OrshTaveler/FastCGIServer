const minX = -5.0;
const maxX = 3.0;
const minY = -3.0;
const maxY = 5.0;
const minR = 1.0;
const maxR = 4.0;

var checkboxes = document.querySelectorAll('input[type=checkbox]');
var rInput = document.getElementById("R-input");
var yInput = document.getElementById("Y-input");
var errorLabels = document.getElementsByClassName("errorMessage");
var circle = document.getElementsByTagName("circle")[0];
var sendButton = document.getElementById("sendButton");
var resultTable = document.getElementsByClassName('result')[0];


checkboxes.forEach((el) => {
    el.addEventListener('change', (event) => {
        if (event.currentTarget.checked) {
            checkboxes.forEach((el2) => {if(el != el2) {
              el2.checked = false
            }})
        } 
      })
})



rInput.addEventListener('input',inputHandler(minR,maxR,errorLabels[1]))
yInput.addEventListener('input',inputHandler(minY,maxY,errorLabels[0]))

function inputHandler(mn,mx,error){   
  function handler(ev){
    var val = parseFloat(ev.target.value);
    error.textContent = "";
    console.log(val)
    if (isNaN(val) & ev.target.value != ""){
      console.log("AA");
      error.textContent = "Введите число!";
      return;
    }
    console.log(val>mx);
    if (mn>val || val > mx ){
      error.textContent = "Введите число от "+String(mn)+" до "+String(mx)+"!";
      console.log(mx,mn)
    }

  }
  return handler
}


sendButton.onclick = sendData;

function moveCircle(X,Y,R){
    circle.setAttribute("visibility", "visible");
    const radiusRealLenght = 120;
    var scale = radiusRealLenght/R;
    circle.setAttribute("cx", 150 + scale*X);
    circle.setAttribute("cy", 150 - scale*Y);   
    if (150 + scale*X > 300 || 150 + scale*X < 0 || 150 - scale*Y > 280 || 150 - scale*Y < 0)  {
      circle.setAttribute("visibility", "hidden");
    }    
}

function addResult(X,Y,R,Result){

      var newRes = '<tr class="result"><td class="ResTable">'+String(X)+'</td><td class="ResTable">'+String(Y)+'</td><td class="ResTable">'+String(R)+'</td><td class="ResTable">'+String(Result)+'</td></tr>';
      resultTable.insertAdjacentHTML( 'afterend', newRes);
   
}

function sendData(){
    var R = rInput.value;
    var Y = yInput.value;
    var X = NaN;
    checkboxes.forEach((el) => {
     if(el.checked){
        X = el.value;
        return;
     }
    })
    if (Y >maxY || Y < minY || R > maxR || R < minR || !Y || !R || isNaN(X)) return;
    moveCircle(X,Y,R);
    addResult(X,Y,R,"TEST");
}

