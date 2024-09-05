const colorPicker = document.getElementById("colorPicker");
const canvascolor=document.getElementById("canva");
const canvas=document.getElementById("mycanvas");
const clearButton=document.getElementById("clearButton");
const saveButton=document.getElementById("saveButton");
const retriveButton=document.getElementById("retriveButton");
const fontSize=document.getElementById("fontSize");
const ctx = canvas.getContext('2d');

colorPicker.addEventListener('change',(e)=>{
    ctx.strokeStyle=e.target.value;
    ctx.fillStyle=e.target.value;
});
canvas.addEventListener('mousedown',(e)=>{
    isDrawing=true;
    lastX=e.offsetX;
    lastY=e.offsetY;
});

canvas.addEventListener('mousemove',(e)=>{
    if(isDrawing){
        ctx.beginPath();
        ctx.moveTo(lastX,lastY);
        ctx.lineTo(e.offsetX,e.offsetY);
        ctx.stroke();

        lastX=e.offsetX;
        lastY=e.offsetY
    }
});
canvas.addEventListener('mouseup',(e)=>{
    isDrawing=false;
});

canvascolor.addEventListener('change',(e)=>{
    ctx.fillStyle=e.target.value;
    ctx.fillRect(0,0,canvas.width,canvas.height);
});
fontSize.addEventListener('change',(e)=>{
    ctx.lineWidth=e.target.value;
});
clearButton.addEventListener('click', (e) => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
});
saveButton.addEventListener('click', (e)=>{
    localStorage.setItem('canvasContents',canvas.toDataURL());
    let link = document.createElement('a');
    link.download='mycanvas.png';
    link.href= canvas.toDataURL();
    link.click();
});
retriveButton.addEventListener('click', (e)=>{
    let savedCanvas = localStorage.getItem('canvasContents');
    if(savedCanvas){
        let img = new Image();
        img.src= savedCanvas;
        ctx.drawImage(img, 0, 0); 
    }
})
