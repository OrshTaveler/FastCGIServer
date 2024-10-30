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
var circles = document.getElementsByClassName("pointer");
var sendButton = document.getElementById("sendButton");
var resultTable = document.getElementsByClassName('result')[0];
var pickX = document.getElementById('pickX');

window.onload = () =>{ 
 var results = [];
 localStorage.clear();
 if(localStorage.getItem('results') == null){ localStorage.setItem('results',JSON.stringify(results));}

 circlesCor = JSON.parse(localStorage.getItem('circles'));   
 if (circlesCor == null) circlesCor = [];   
 results = JSON.parse(localStorage.getItem('results'));
 results.forEach((el) => {
    if (el.length == 4){
      var X = el[0];
      var Y = el[1];
      var R = el[2];
      var Result = el[3];
      var newRes = '<tr class="result"><td class="ResTable">'+String(X)+'</td><td class="ResTable">'+String(Y)+'</td><td class="ResTable">'+String(R)+'</td><td class="ResTable">'+String(Result)+'</td></tr>';
      resultTable.insertAdjacentHTML( 'afterend', newRes);

    } ;
 })
 circlesCor.forEach((el) =>{
    circles[el[3]].setAttribute("cx",el[0]);
    circles[el[3]].setAttribute("cy",el[1]);
    circles[el[3]].setAttribute("visibility",el[2]);
 })
}






rInput.addEventListener('input',inputHandler(minR,maxR,errorLabels[1]))
yInput.addEventListener('input',inputHandler(minY,maxY,errorLabels[0]))

function inputHandler(mn,mx,error){   
  function handler(ev){
    var val = parseFloat(ev.target.value);
    error.textContent = "";
    console.log(val)
    if (isNaN(val) & ev.target.value != ""){
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

function moveCircle(X,Y,R,nm){
    
    circles[nm].setAttribute("visibility", "visible");
    const radiusRealLenght = 120;
    var scale = radiusRealLenght/R;
    circles[nm].setAttribute("cx", 150 + scale*X);
    circles[nm].setAttribute("cy", 150 - scale*Y);   
    if (150 + scale*X > 300 || 150 + scale*X < 0 || 150 - scale*Y > 280 || 150 - scale*Y < 0)  {
      circles[nm].setAttribute("visibility", "hidden");
    }    
    var cr = JSON.parse(localStorage.getItem('circles'));
    cr.push([150 + scale*X,150 - scale*Y,circles[nm].getAttribute('visivility'),nm]);
    localStorage.setItem("circles", JSON.stringify(cr));
}

function addResult(X,Y,R,Result){
      var newRes = '<tr class="result"><td class="ResTable">'+String(X)+'</td><td class="ResTable">'+String(Y)+'</td><td class="ResTable">'+String(R)+'</td><td class="ResTable">'+String(Result)+'</td></tr>';
      resultTable.insertAdjacentHTML( 'afterend', newRes); 
}


function warnUser(Xlen,Y,R){
    pickX.style.color = "#ffffff";
    if (Xlen == 0) {pickX.style.color = "rgb(255, 45, 126)";}  
    if (!Y){errorLabels[0].textContent = "Введите число от "+minY+" до "+maxY+"!";}
    if (!R){errorLabels[1].textContent = "Введите число от "+minR+" до "+maxR+"!";}

}
function hideAllCircles(){
  console.log(circles);
  for(var i = 0; i < 9; i++){
    circles[i].setAttribute('visibility','hidden');
  }
}


function sendData(){
    localStorage.setItem('circles',JSON.stringify([]))
    hideAllCircles();


    var Xlen = 0;
    var R = rInput.value;
    var Y = yInput.value;
    var k = -1;
    checkboxes.forEach((el) => {  
    k++;  
    if (!el.checked) return;
    Xlen++;
     R = rInput.value;
     Y = yInput.value;
     console.log(el.value,k);
     var X = el.value;
    warnUser(Xlen,Y,R);
    var results = JSON.parse(localStorage.getItem('results'));
    if (Y >maxY || Y < minY || R > maxR || R < minR || !Y || !R || isNaN(X)) return;
  
    moveCircle(X,Y,R,k);
    const url = new URL('./fcgi-bin/server.jar/', window.location.href);
		fetch(url.href, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				x: X,
				y: Y,
				r: R
			})
		}).then(response => response.json()).then(data => {
			console.log("SUCCESS! ", data);
			var res = String(data["result"]) + ' / ' + data["exTime"];
      results.push([X,Y,R,res]);
      localStorage.setItem('results',JSON.stringify(results));
			addResult(X,Y,R,res);

		}).catch((error) => {
      results.push([X,Y,R,'error']);
      localStorage.setItem('results',JSON.stringify(results));
			console.error("ERROR! ", error);
			addResult(X,Y,R,"error");
		});
  }) 
  console.log(Xlen);
  warnUser(Xlen,Y,R);
  }
