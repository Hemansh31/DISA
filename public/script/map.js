var map;
var pos;
var latitude;
var longitude;
var updatepos;
// Initialize and add the map
function initMap() {
// The location of iitd
var iitd = {lat: 28.4400672, lng: 77.0716832};
// The map, centered at iitd
map = new google.maps.Map(
document.getElementById('map'), {zoom: 20, center: iitd});
// The marker, positioned at iitd
//var marker = new google.maps.Marker({position: iitd, map: map});
getpos();
}
function getpos(){
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      pos=JSON.parse(this.responseText);
      console.log(pos);
      latitude=JSON.parse(pos.lat);
      longitude=JSON.parse(pos.long);
      marker();
    }
  };
  xhttp.open("GET", "/mapcord", true);
  xhttp.send();
}

function marker(){
var cart1 = {lat: latitude[0], lng: longitude[0]};
////console.log(cart1);
var cart2 = {lat: latitude[1], lng: longitude[1]};
//console.log(cart2);
var marker1 = new google.maps.Marker({
  position: cart1,
  map: map
  //icon:'https://t4.ftcdn.net/jpg/00/63/52/69/240_F_63526969_cI4VAyNX5AyHQ4W5nvrMoE5xvv1d5PcY.jpg'
});
var marker2 = new google.maps.Marker({
  position: cart2,
  map: map
  //icon:'https://t4.ftcdn.net/jpg/00/63/52/69/240_F_63526969_cI4VAyNX5AyHQ4W5nvrMoE5xvv1d5PcY.jpg'
});
//map.setCenter(marker1.getPosition());

}
function startupdt(){
updatepos=setInterval(getpos,2000);
}
function stopupdt(){
  clearInterval(updatepos);
}
