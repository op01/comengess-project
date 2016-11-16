var config = {
  apiKey: "AIzaSyCR_iF3tJK99zYF944_6Xe_8NJpLaKxxXU",
  databaseURL: "https://fire-bb43b.firebaseio.com",
};
firebase.initializeApp(config);
var database = firebase.database();
var iot=database.ref('/iot');
var green=[46, 204, 113]
var orange=[230, 126, 34]
var red=[231, 76, 60]
var silver=[189, 195, 199]
var blue=[52, 152, 219]
var setup=1
var setupInterval;
var lastVal;
function update(val){
  var color;
  if(val<40){
    color=red;
  }
  else if(val<100){
    color=mix(red,orange,(100-val)/60)
  }
  else if(val<160){
    color=mix(orange,green,(160-val)/60)
  }
  else{
    color=green
  }
  setBackground(color)
}
function setBackground(color){
  document.body.style.backgroundColor='rgb('+color.join()+')'
}
function mix(color1, color2, weight) {
    var p = weight;
    var w = p * 2 - 1;
    var w1 = (w/1+1) / 2;
    var w2 = 1 - w1;
    var rgb = [Math.round(color1[0] * w1 + color2[0] * w2),
        Math.round(color1[1] * w1 + color2[1] * w2),
        Math.round(color1[2] * w1 + color2[2] * w2)];
    return rgb;
}
function onData(val){
    if(setup!=0){
        lastVal=val
        return
    }
    val=parseInt(val)
    if(0<=val && val<=200){
        cat.className="hidden"
        gg.innerHTML=val
        ez.innerHTML="cm"
        update(val)
    }
    else{
        cat.className=""
        gg.innerHTML=""
        ez.innerHTML="Out of range"
        setBackground(silver)
    }
}
var now=200
var ddd;
function up(){
    setup++;
    ez.innerHTML+='.'
    if(setup==5){
        setup=0
        clearInterval(setupInterval)
        if(lastVal)onData(lastVal)
        setInterval(runDemo,50)
    }
}
function runDemo(){
    if(now==200)ddd=-1
    if(now==-50)ddd=1
    now+=ddd
    onData(now)
}
window.onload=function(){
    gg=document.getElementById("GG")
    ez=document.getElementById("EZ")
    cat=document.getElementById("lolcat")
    setBackground(blue)
    gg.innerHTML="Setting up"
    ez.innerHTML=""
    setupInterval=setInterval(up,800)
    iot.on('child_added',data=>{
        onData(data.val().value)
    })
}
