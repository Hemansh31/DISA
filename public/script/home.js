function oli(){
  document.getElementById('ddm').style.display="grid";
    document.getElementById('ddm2').style.display="none";
        document.getElementById('hmpg').style.display="none";
}
function cli(){
  document.getElementById('ddm').style.display="none";
  document.getElementById('ddm2').style.display="none";
      document.getElementById('hmpg').style.display="grid";
}
function osu(){
  document.getElementById('ddm2').style.display="grid";
    document.getElementById('ddm').style.display="none";
      document.getElementById('hmpg').style.display="none";
}
function smc1(){
  var x=document.getElementById('inhm').children;
  x[3].style.display="block";
  x[2].style.display="none";
  x[1].style.borderBottomColor="white";
  x[0].style.borderBottomColor="#276EF1";
  stopupdt();
}
function smc2(){
  var x=document.getElementById('inhm').children;
  x[2].style.display="block";
  x[3].style.display="none";
  x[0].style.borderBottomColor="white";
  x[1].style.borderBottomColor="#276EF1";
startupdt();
}
