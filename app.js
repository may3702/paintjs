const canvas = document.getElementById("jsCanvas");
    //캔버스에 pixel modifier 사이즈 주기
    const CANVAS_SIZE = 700;
    canvas.width = CANVAS_SIZE;
    canvas.height = CANVAS_SIZE;

//Context는 canvas안에서 픽셀을 다룸
const ctx = canvas.getContext("2d");
const INITIAL_COLOR = "#2c2c2c";
    //채우는 색상
    ctx.fillStyle = "INITIAL_COLOR";
    //그려지는 선 색상
    ctx.strokeStyle = "INITIAL_COLOR";
    //그려지는 선의 너비
    ctx.lineWidth = 2.5;

let painting = false;
    //그림그리기 멈추기
    function stopPainting(){
        painting = false;
    };
    //그림그리기 시작
    function startPainting(){
        painting = true;
    };

function onMouseMove(event){
    //캔버스에 마우스를 올렸을 때 좌표 값
    const x = event.offsetX;
    const y = event.offsetY;
    //클릭하지 않고 움직였을 때 (painting을 하지 않으면)
    //          마우스를 움직이는 모든 순간에 path를 만듦
    if(!painting){         //painting = true
        //path를 만들면
        ctx.beginPath();
        //마우스의 x, y 좌표로 path를 옮김
        ctx.moveTo(x, y);
    } else {
    //클릭하고 움직였을 때 (painting을 하면)
        //path부터 x, y 좌표까지 선이 만들어짐
        //                            path를 만들고
        ctx.lineTo(x, y);
        //현재의 sub-path를 현재의 strokeStyle(색상)로 획을 그음
        //                            획을 긋는다
        ctx.stroke();
    };
};

if(canvas){
    //1.캔버스에 마우스를 올렸을 때
    canvas.addEventListener("mousemove", onMouseMove);
    //2.캔버스에서 클릭을 했을 때
    canvas.addEventListener("mousedown", startPainting);
    //3.캔버스에서 클릭을 끝냈을 때
    canvas.addEventListener("mouseup", stopPainting);
    //4.캔버스에서 마우스가 벗어났을 때
    canvas.addEventListener("mouseleave", stopPainting);
    //5.캔버스를 클릭했을 때 캔버스 채우기
    canvas.addEventListener("click", handleCanvasClick);
};





//// 색상 바꾸기
function handleColorClick(event){
    //target -> 이벤트가 발생한 요소에 대한 속성 값을 얻음
    //console.log(event.target.style.backgroundColor);
    const ChangeColor = event.target.style.backgroundColor;
    ctx.strokeStyle = ChangeColor;
    //fill모드 색상도 변경 시켜주기
    ctx.fillStyle = ChangeColor;
};

const colors = document.getElementsByClassName("jsColor");
//Array.from() -> object를 array로 변경해줌
//colors를 배열로 변경
//각각의 배열에 대하여 클릭이벤트 실행
Array.from(colors).forEach(item => item.addEventListener("click", handleColorClick));





//// 브러쉬 사이즈 바꾸기
const range = document.getElementById("jsRange");

function handleRangeChange(event){
    //console.log(event.target.value);
    const ChangeSize = event.target.value;
    ctx.lineWidth = ChangeSize;
};

if(range){
    range.addEventListener("input", handleRangeChange);
};





//// fill, paint 모드
const mode = document.getElementById("jsMode");
let filling = false;

function handleModeClick(){
    //FILL(true)   PAINT(false)
    //FILL버전 -> PAINT버전
    if(filling === true){               //클릭할때 true(FILL)상태라면
        filling = false;                //false(PAINT)버전으로 변경
        mode.innerText = "FILL";        //FILL버전으로 넘어가기 위한 텍스트
    //PANIT버전 -> FILL버전
    } else {                            //클릭할때 false(PAINT)상태라면
        filling = true;                 //true(FILL)버전으로 변경
        mode.innerText = "PAINT";       //PAINT버전으로 넘어가기 위한 텍스트
    }; 
};

if(mode){
    mode.addEventListener("click", handleModeClick);
};





//FILL모드 상태일때 캔버스에 색상 채우기
function handleCanvasClick(){   //Canvas를 클릭했을 때 
    if(filling === true){       //filling이 true이면 (=FILL버전이면)
        ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
    };
};

//ctx.fillRect(x, y, width, height);
//            (x, y)위치에 width와 height 사이즈로 색칠된 사각형을 그림

//ctx.fillStyle = "color";
//                 채우기 할 색상을 정함