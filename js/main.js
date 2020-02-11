var gKeepDrawing = false;
var gCanvas;
var gCtx;
var gCurrShape = 'triangle'




function init() {
    gCanvas = document.getElementById('my-canvas')
    gCtx = gCanvas.getContext('2d')
}


// function drawOn(ev) {
//     console.log(ev)
// }

function getFillColor() {
    var color = document.querySelector('#fill-color').value;
    // console.log(color.value)
    return color;
}

function getLineColor() {
    var color = document.querySelector('#line-color').value;
    // console.log(color.value)
    return color;
}



function drawLine(x, y, xEnd = 250, yEnd = 250) {
    gCtx.beginPath()
    gCtx.moveTo(x, y)
    gCtx.lineTo(getRandomInt(250), getRandomInt(250))
    gCtx.closePath()
    gCtx.strokeStyle = `${getLineColor()}`; ///'red'///
    gCtx.stroke()

}

function drawTriangle(x, y) {
    gCtx.beginPath()
    gCtx.moveTo(x, y)
    gCtx.lineTo(getRandomInt(250), getRandomInt(250))
    gCtx.lineTo(getRandomInt(250), getRandomInt(250))
    gCtx.closePath() //insted of lineTo(x,y) 
    gCtx.strokeStyle = `${getLineColor()}`;
    gCtx.stroke()
    gCtx.fillStyle = `${getFillColor()}`;
    gCtx.fill()
}

function drawRect(x, y) {
    gCtx.beginPath()
    gCtx.rect(x, y, getRandomInt(250), getRandomInt(250))
    gCtx.strokeStyle = `${getLineColor()}`;
    gCtx.stroke()
    gCtx.fillStyle = `${getFillColor()}`;
    gCtx.fillRect(x, y, getRandomInt(250), getRandomInt(250))
}

function drawArc(x, y) {
    gCtx.beginPath()
    gCtx.lineWidth = '6'
    gCtx.arc(x, y, 60, 0, 2 * Math.PI);
    gCtx.strokeStyle = `${getLineColor()}`;
    gCtx.stroke();
    gCtx.fillStyle = `${getFillColor()}`;
    gCtx.fill()

}

function drawText(text, x, y) {
    // gCtx.lineWidth = '2'
    gCtx.strokeStyle = `${getLineColor()}`;
    gCtx.fillStyle = `${getFillColor()}`;
    var fontSize = getRandomInt(60);
    gCtx.font = `${fontSize}px Ariel`
        // gCtx.textAlign = 'center'
    gCtx.fillText(text, x, y)
    gCtx.strokeText(text, x, y)
}

function saveAndRestoreExample() {
    gCtx.strokeStyle = `${getLineColor()}`;
    gCtx.fillStyle = `${getFillColor()}`;
    drawText('befor save', 100, 60)
    gCtx.save()
        // drawText('after save', 100, 160)
    gCtx.strokeStyle = `${getLineColor()}`;
    gCtx.fillStyle = `${getFillColor()}`;
    drawText('after save and change', 20, 260)
    gCtx.restore()
    drawText('after restore', 100, 360)
}

function clearCanvas() {
    gCtx.clearRect(0, 0, gCanvas.width, gCanvas.height)
        // You may clear part of the canvas
        // gCtx.clearRect(50, 50, 200, 200)
}

function drawImg() {
    var elImg = document.querySelector('img')
    gCtx.drawImage(elImg, 0, 0, gCanvas.width, gCanvas.height)
}

function drawImg2() {
    var img = new Image()
    img.src = './img/1.jpg';
    img.onload = () => {
        gCtx.drawImage(img, 0, 0, gCanvas.width, gCanvas.height)
    }
}

function drawImg3() {
    var img = new Image()
    img.src = 'https://steamuserimages-a.akamaihd.net/ugc/940586530515504757/CDDE77CB810474E1C07B945E40AE4713141AFD76/';
    img.onload = () => {
        gCtx.drawImage(img, 0, 0, gCanvas.width, gCanvas.height) //img,x,y,xend,yend
    }
}

function downloadCanvas(elLink) {
    const data = gCanvas.toDataURL()
    elLink.href = data
    elLink.download = 'puki'
}

function resizeCanvas() {
    var elContainer = document.querySelector('.canvas-container');
    // Note: changing the canvas dimension this way clears the canvas
    gCanvas.width = elContainer.offsetWidth
    gCanvas.height = elContainer.offsetHeight
}


function setShape(shape) {
    gCurrShape = shape
}

function startDraw(ev) {
    // console.log(ev)
    gKeepDrawing = true;
    drawing(ev);
}


function draw(ev) {
    // console.log(ev)
    if (!gKeepDrawing) return;
    drawing(ev);
}

function stopDraw(ev) {
    gKeepDrawing = false;

}

function drawing(ev) {

    const offsetX = ev.offsetX
    const offsetY = ev.offsetY
    console.log(offsetX, offsetY)
        // const { offsetX, offsetY } = ev
    switch (gCurrShape) {
        case 'triangle':
            drawTriangle(offsetX, offsetY)
            break;
        case 'rect':
            drawRect(offsetX, offsetY)
            break;
        case 'text':
            drawText('Puki', offsetX, offsetY)
            break;
        case 'line':
            drawLine(offsetX, offsetY)
            break;
    }
}

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

function testHammer() {

    const elCanvas = document.querySelector('.canvas-container')
    var hammerTime = new Hammer(elCanvas);
    // const elTxt = elBox.querySelector('h3')
    console.log('hammer ready', hammerTime);
    // hammerTime.on('touchstart touchend touchmove', function (ev) {
    //     elTxt.innerText = ev.type
    //     console.log(ev);
    // });
}