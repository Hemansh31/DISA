var liveloc;

function startsharing(){
  document.getElementById('off').style.display="none";
  document.getElementById('on').style.display="table-cell";
  document.getElementById('on').style.color="black";
  document.getElementById('on').style.backgroundColor="#ddde3c";
  liveloc=setInterval(loc,1000);
}
function stopsharing(){
  document.getElementById('on').style.display="none";
  document.getElementById('off').style.display="table-cell";
  clearInterval(liveloc);
}

function loc() {
  var startPos;
  var geoSuccess = function(position) {
    startPos = position;
    var lat = startPos.coords.latitude;
    var long = startPos.coords.longitude;
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        console.log(this.responseText);
          }
        };
    console.log(lat);
    console.log(long);
    xhttp.open("POST", "/driver_dashboard", true);
    xhttp.setRequestHeader("lat",lat);
    xhttp.setRequestHeader("long",long);
    xhttp.send("Coordinates");
  };
  navigator.geolocation.getCurrentPosition(geoSuccess);
}
