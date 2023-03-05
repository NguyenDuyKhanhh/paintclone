var color = document.querySelector("#color-paint");
var eraser = document.querySelector("#eraser");
var decrease = document.querySelector("#decrease");
var fontSize = document.querySelector("#fsize span");
var increase = document.querySelector("#increase");
var save = document.querySelector("#save");
var clear = document.querySelector("#clear");
var canvas = document.querySelector("canvas");
var ctx = canvas.getContext("2d")

var posBefore ={
    x: 0,
    y: 0
}
var posAfter ={
    x: 0,
    y: 0
}
var isDrawing = false;
var changeColor = 'fffff';
var size = 5;
canvas.addEventListener("mousedown",(e)=>{
    posBefore ={
        x: e.offsetX,
        y: e.offsetY
    }
    console.log('posbefore',posBefore)
    
  isDrawing = true;
})
canvas.addEventListener("mousemove",(e)=>{
   if(isDrawing===true){
    posAfter ={
        x: e.offsetX,
        y: e.offsetY
    }
   
    ctx.beginPath()
    ctx.arc(posBefore.x, posBefore.y,size,0, 2 * Math.PI);
    ctx.fillStyle = changeColor;
    ctx.fill()
    ctx.beginPath()
    ctx.moveTo(posBefore.x,posBefore.y)
    ctx.lineTo(posAfter.x,posAfter.y)
    ctx.strokeStyle = changeColor
    ctx.lineWidth = size*2;
    ctx.closePath()
    ctx.stroke()
    posBefore.x = posAfter.x
    posBefore.y = posAfter.y
   }
   
})
document.addEventListener("mouseup",()=>{
    isDrawing = false;
})
canvas.addEventListener("blur",()=>{
    isDrawing = false;
})
color.addEventListener("change",(e)=>{
    changeColor = e.target.value;
})
eraser.addEventListener("click",(e)=>{
    changeColor = 'white';
})
decrease.addEventListener("click",()=>{
   
  if(size>5){
    size -=5;
  }
  else{
    size =5
  }
  fontSize.innerText =size;
})
increase.addEventListener("click",()=>{
   
    if(size>30){
      size =30;
      increase.style.cursor = 'not-allowed'
    }
    else{
      size +=5
    }
    fontSize.innerText=size;
})
clear.addEventListener('click',()=>{
    const rect = canvas.getClientRects()[0];
    console.log(rect)
    ctx.clearRect(0,0,rect.width,rect.height)
})
save.addEventListener('click',()=>{
    const imageURI = canvas.toDataURL('image/png').replace("image/png", "image/octet-stream");
    save.setAttribute('href',imageURI)
})