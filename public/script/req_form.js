function fill(){
  document.getElementById('fpop').style.display="grid";
  clvfill();
}
function clfill(){
  document.getElementById('fpop').style.display="none";
}
function vfill(){
  document.getElementById('vpop').style.display="grid";
  document.getElementById('fpop').style.display="none";
  viewrides();
}
function clvfill(){
  document.getElementById('vpop').style.display="none";
  var tbody=document.getElementById('dynamic');
  while(tbody.rows.length!=0){
   tbody.deleteRow(0);
  }
}
