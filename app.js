const canvas = document.getElementById("jsCanvas");
    //캔버스에 pixel modifier 사이즈 주기
    canvas.width = 700;
    canvas.height = 700;

//Context는 canvas안에서 픽셀을 다룸
const ctx = canvas.getContext("2d");
    //그려지는 선 색상
    ctx.strokeStyle = "#2c2c2c";
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
};





//색상 바꾸기
function handleColorClick(event){
    //target -> 이벤트가 발생한 요소에 대한 속성 값을 얻음
    // console.log(event.target.style.backgroundColor);
    const ChangeColor = event.target.style.backgroundColor;
    ctx.strokeStyle = ChangeColor;
};


const colors = document.getElementsByClassName("jsColor");
//Array.from() -> object를 array로 변경해줌
//colors를 배열로 변경
//각각의 배열에 대하여 클릭이벤트 실행
Array.from(colors).forEach(item => item.addEventListener("click", handleColorClick));