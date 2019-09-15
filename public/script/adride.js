var mon=[];
var tue=[];
var wed=[];
var thur=[];
var fri=[];
function cruser(){
  switch (document.getElementById('fillday').value) {
    case "monday":
      var obj={
        ploc:document.getElementById('fillpl').value,
        dloc:document.getElementById('filldl').value,
        ptime:(parseInt(document.getElementById('hr').value)*(100))+(parseInt(document.getElementById('min').value))
      }
      mon.push(JSON.stringify(obj));
      document.getElementById('d1').value=JSON.stringify(mon);
      break;
    case "tuesday":
    var obj={
      ploc:document.getElementById('fillpl').value,
      dloc:document.getElementById('filldl').value,
      ptime:(parseInt(document.getElementById('hr').value)*(100))+(parseInt(document.getElementById('min').value))
    }
    tue.push(JSON.stringify(obj));
    document.getElementById('d2').value=JSON.stringify(tue);
      break;
    case "wednesday":
    var obj={
      ploc:document.getElementById('fillpl').value,
      dloc:document.getElementById('filldl').value,
      ptime:(parseInt(document.getElementById('hr').value)*(100))+(parseInt(document.getElementById('min').value))
    }
    wed.push(JSON.stringify(obj));
    document.getElementById('d3').value=JSON.stringify(wed);
        break;
    case "thursday":
    var obj={
      ploc:document.getElementById('fillpl').value,
      dloc:document.getElementById('filldl').value,
      ptime:(parseInt(document.getElementById('hr').value)*(100))+(parseInt(document.getElementById('min').value))
    }
    thur.push(JSON.stringify(obj));
    document.getElementById('d4').value=JSON.stringify(thur);
      break;
    case "friday":
    var obj={
      ploc:document.getElementById('fillpl').value,
      dloc:document.getElementById('filldl').value,
      ptime:(parseInt(document.getElementById('hr').value)*(100))+(parseInt(document.getElementById('min').value))
    }
    fri.push(JSON.stringify(obj));
    document.getElementById('d5').value=JSON.stringify(fri);
      break;
    default:;
  }
  document.getElementById('nrides').value=(mon.length+tue.length+wed.length+thur.length+fri.length)+" "+"rides added";
  clfill();
}
function viewrides(){
  var i;
  var tbody=document.getElementById('dynamic');
  var nrows=tbody.rows.length;
  while(tbody.rows.length!=0){
   tbody.deleteRow(0);
  }
  for(i=0;i<mon.length;i++){
    var trow=tbody.insertRow(-1);
    var tday=trow.insertCell(0);
    var tploc=trow.insertCell(1);
    var tdloc=trow.insertCell(2);
    var tptime=trow.insertCell(3);
    tptime.setAttribute("data-label","Pickup Time");
    tdloc.setAttribute("data-label","Drop Location");
    tploc.setAttribute("data-label","Pickup Location");
    tday.setAttribute("data-label","Day");
    tday.setAttribute("scope","row");
    tday.innerHTML="Monday";
    var obj=JSON.parse(mon[i]);
    tploc.innerHTML=obj.ploc;
    tdloc.innerHTML=obj.dloc;
    var tmin=(obj.ptime%100);
    if(tmin==0){
      tptime.innerHTML=(Math.floor(obj.ptime/100))+":"+"00";
    }
    else{
      tptime.innerHTML=(Math.floor(obj.ptime/100))+":"+tmin;
    }
    var tdel=trow.insertCell(4);
    var tcen=document.createElement("CENTER");
    var btn = document.createElement("BUTTON");
    btn.innerHTML = "Delete Ride";
    btn.setAttribute("type","button");
    btn.setAttribute("name","button");
    btn.setAttribute("class","adbtn2");
    btn.setAttribute("onclick","delr()");
    btn.setAttribute("cnt",tbody.rows.length);
    btn.setAttribute("cntarr",i);
    btn.setAttribute("day","mon");
    tcen.appendChild(btn);
    tdel.appendChild(tcen);
  }

  for(i=0;i<tue.length;i++){
    var trow=tbody.insertRow(-1);
    var tday=trow.insertCell(0);
    var tploc=trow.insertCell(1);
    var tdloc=trow.insertCell(2);
    var tptime=trow.insertCell(3);
    tptime.setAttribute("data-label","Pickup Time");
    tdloc.setAttribute("data-label","Drop Location");
    tploc.setAttribute("data-label","Pickup Location");
    tday.setAttribute("data-label","Day");
    tday.setAttribute("scope","row");
    tday.innerHTML="Tuesday";
    var obj=JSON.parse(tue[i]);
    tploc.innerHTML=obj.ploc;
    tdloc.innerHTML=obj.dloc;
    var tmin=(obj.ptime%100);
    if(tmin==0){
      tptime.innerHTML=(Math.floor(obj.ptime/100))+":"+"00";
    }
    else{
      tptime.innerHTML=(Math.floor(obj.ptime/100))+":"+tmin;
    }
    var tdel=trow.insertCell(4);
    var tcen=document.createElement("CENTER");
    var btn = document.createElement("BUTTON");
    btn.innerHTML = "Delete Ride";
    btn.setAttribute("type","button");
    btn.setAttribute("name","button");
    btn.setAttribute("class","adbtn2");
    btn.setAttribute("onclick","delr()");
    btn.setAttribute("cnt",tbody.rows.length);
    btn.setAttribute("cntarr",i);
    btn.setAttribute("day","tue");
    tcen.appendChild(btn);
    tdel.appendChild(tcen);
  }

  for(i=0;i<wed.length;i++){
    var trow=tbody.insertRow(-1);
    var tday=trow.insertCell(0);
    var tploc=trow.insertCell(1);
    var tdloc=trow.insertCell(2);
    var tptime=trow.insertCell(3);
    tptime.setAttribute("data-label","Pickup Time");
    tdloc.setAttribute("data-label","Drop Location");
    tploc.setAttribute("data-label","Pickup Location");
    tday.setAttribute("data-label","Day");
    tday.setAttribute("scope","row");
    tday.innerHTML="Wednesday";
    var obj=JSON.parse(wed[i]);
    tploc.innerHTML=obj.ploc;
    tdloc.innerHTML=obj.dloc;
    var tmin=(obj.ptime%100);
    if(tmin==0){
      tptime.innerHTML=(Math.floor(obj.ptime/100))+":"+"00";
    }
    else{
      tptime.innerHTML=(Math.floor(obj.ptime/100))+":"+tmin;
    }
    var tdel=trow.insertCell(4);
    var tcen=document.createElement("CENTER");
    var btn = document.createElement("BUTTON");
    btn.innerHTML = "Delete Ride";
    btn.setAttribute("type","button");
    btn.setAttribute("name","button");
    btn.setAttribute("class","adbtn2");
    btn.setAttribute("onclick","delr()");
    btn.setAttribute("cnt",tbody.rows.length);
    btn.setAttribute("cntarr",i);
    btn.setAttribute("day","wed");
    tcen.appendChild(btn);
    tdel.appendChild(tcen);
  }

  for(i=0;i<thur.length;i++){
    var trow=tbody.insertRow(-1);
    var tday=trow.insertCell(0);
    var tploc=trow.insertCell(1);
    var tdloc=trow.insertCell(2);
    var tptime=trow.insertCell(3);
    tptime.setAttribute("data-label","Pickup Time");
    tdloc.setAttribute("data-label","Drop Location");
    tploc.setAttribute("data-label","Pickup Location");
    tday.setAttribute("data-label","Day");
    tday.setAttribute("scope","row");
    tday.innerHTML="Thursday";
    var obj=JSON.parse(thur[i]);
    tploc.innerHTML=obj.ploc;
    tdloc.innerHTML=obj.dloc;
    var tmin=(obj.ptime%100);
    if(tmin==0){
      tptime.innerHTML=(Math.floor(obj.ptime/100))+":"+"00";
    }
    else{
      tptime.innerHTML=(Math.floor(obj.ptime/100))+":"+tmin;
    }
    var tdel=trow.insertCell(4);
    var tcen=document.createElement("CENTER");
    var btn = document.createElement("BUTTON");
    btn.innerHTML = "Delete Ride";
    btn.setAttribute("type","button");
    btn.setAttribute("name","button");
    btn.setAttribute("class","adbtn2");
    btn.setAttribute("onclick","delr()");
    btn.setAttribute("cnt",tbody.rows.length);
    btn.setAttribute("cntarr",i);
    btn.setAttribute("day","thur");
    tcen.appendChild(btn);
    tdel.appendChild(tcen);
  }

  for(i=0;i<fri.length;i++){
    var trow=tbody.insertRow(-1);
    var tday=trow.insertCell(0);
    var tploc=trow.insertCell(1);
    var tdloc=trow.insertCell(2);
    var tptime=trow.insertCell(3);
    tptime.setAttribute("data-label","Pickup Time");
    tdloc.setAttribute("data-label","Drop Location");
    tploc.setAttribute("data-label","Pickup Location");
    tday.setAttribute("data-label","Day");
    tday.setAttribute("scope","row");
    tday.innerHTML="Friday";
    var obj=JSON.parse(fri[i]);
    tploc.innerHTML=obj.ploc;
    tdloc.innerHTML=obj.dloc;
    var tmin=(obj.ptime%100);
    if(tmin==0){
      tptime.innerHTML=(Math.floor(obj.ptime/100))+":"+"00";
    }
    else{
      tptime.innerHTML=(Math.floor(obj.ptime/100))+":"+tmin;
    }
    var tdel=trow.insertCell(4);
    var tcen=document.createElement("CENTER");
    var btn = document.createElement("BUTTON");
    btn.innerHTML = "Delete Ride";
    btn.setAttribute("type","button");
    btn.setAttribute("name","button");
    btn.setAttribute("class","adbtn2");
    btn.setAttribute("onclick","delr()");
    btn.setAttribute("cnt",tbody.rows.length);
    btn.setAttribute("cntarr",i);
    btn.setAttribute("day","fri");
    tcen.appendChild(btn);
    tdel.appendChild(tcen);
  }
  document.getElementById('nrides').value=(mon.length+tue.length+wed.length+thur.length+fri.length)+" Rides Addes";
}
function delr(){
  var tbody=document.getElementById('dynamic');
  var elem= event.target;
  switch (elem.getAttribute("day")) {
    case "mon":
    var i=parseInt(elem.getAttribute("cnt"));
    var j=parseInt(elem.getAttribute("cntarr"));
      tbody.deleteRow(i-1);
    //  console.log(i);
      mon.splice(j,1);
    //  console.log(j);
    viewrides();
      break;
    case "tue":
    var i=parseInt(elem.getAttribute("cnt"));
    var j=parseInt(elem.getAttribute("cntarr"));
      tbody.deleteRow(i-1);
    //  console.log(tue);
      tue.splice(j,1);
    //  console.log(tue);
    viewrides();
      break;
    case "wed":
    var i=parseInt(elem.getAttribute("cnt"));
    var j=parseInt(elem.getAttribute("cntarr"));
      tbody.deleteRow(i-1);
      wed.splice(j,1);
    viewrides();
      break;
    case "thur":
    var i=parseInt(elem.getAttribute("cnt"));
    var j=parseInt(elem.getAttribute("cntarr"));
      tbody.deleteRow(i-1);
      thur.splice(j,1);
    viewrides();
      break;
    case "fri":
    var i=parseInt(elem.getAttribute("cnt"));
    var j=parseInt(elem.getAttribute("cntarr"));
      tbody.deleteRow(i-1);
      fri.splice(j,1);
    viewrides();
      break;
    default:

  }
  //console.log(elem.getAttribute("cnt"));
  //console.log(elem.getAttribute("cntarr"));
  //console.log(elem);
}
