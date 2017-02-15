(function (){
    var points = [],
        ManPosition={},
        ARM={};
    var times,
        leftleg=1,
        rightleg=0,
        longs=0;

    var canvas = document.getElementById("canvas"),
        context = canvas.getContext("2d"),
        gameover = document.getElementById("end"),
        start = document.getElementById("start"),
        begin = document.getElementById("begin"),
        restart = document.getElementById("restart"),
        text = document.getElementById('over');
        long = document.getElementById('long');
    var words = ["look out","bro","shit","unfair","哎呀","what the fuck"];
    canvas.width = document.documentElement.clientWidth-2;
    canvas.height = document.documentElement.clientHeight-2;

    function init(){
        ManPosition={
            x:290,
            y:300,
            legx:290,
            legy:390,
            leftfoot:290,
            rightfoot:290,
            movely:440,
            movery:440
        };
        ARM={
            x:290,
            y:320,
            leftx:290,
            rightx:290,
            army:370,
            flag:1
        };
        points = [260,350];
        longs=0;
        drawWays();
    }

    function drawMan(){
        //画身子
        context.beginPath();
        context.arc(ManPosition.x,ManPosition.y,20,0,2*Math.PI,true);
        context.fillStyle = "#000";
        context.fill();
        context.fillRect(ManPosition.x-5,ManPosition.y,10,90);
        context.closePath();
        //画腿(左)
        context.lineWidth = 3;
        context.strokeStyle = "#f00";
        context.lineCap = "round"
        context.beginPath();
        context.moveTo(ManPosition.legx,ManPosition.legy);
        context.lineTo(ManPosition.leftfoot,ManPosition.movely);
        context.lineTo(ManPosition.leftfoot+10,ManPosition.movely);
        context.stroke();

        context.beginPath();
        context.moveTo(ManPosition.legx,ManPosition.legy);
        context.lineTo(ManPosition.rightfoot,ManPosition.movery);
        context.lineTo(ManPosition.rightfoot+10,ManPosition.movery);
        context.strokeStyle = "#000";
        context.stroke();

        //画胳膊
        context.beginPath();
        context.moveTo(ARM.x,ARM.y);
        context.lineTo(ARM.leftx,ARM.army);
        context.moveTo(ARM.x,ARM.y);
        context.lineTo(ARM.rightx,ARM.army);
        context.stroke();
    }
    
    function drawWays(){
        context.clearRect(0,0,canvas.width,canvas.height);
        drawMan();

        context.lineWidth = 5;
        context.lineCap = "square"
        context.strokeStyle = "#000";

        context.beginPath();
        points[0]<=0&&points.shift();
        context.moveTo(points[0],445);
        for(var i = 1;i<points.length;i++){
            if(points[points.length-1]<canvas.width){
                points.push(points[points.length-1]+parseInt(Math.random()*70+40))
            }
            context.lineTo(points[i],445);
            context.moveTo(points[i]+10,445);
        }
        context.closePath();
        context.stroke();
        long.innerText = Math.floor(longs/15);
    }
    function moveMap(){
        for(let i = 0;i<points.length;i++){
            points[i] = points[i]-5;
        }
        longs+=1;
        if(rightleg){
            ManPosition.leftfoot = ManPosition.leftfoot-5;
            ManPosition.rightfoot = ManPosition.rightfoot+5;
            ARM.leftx -= 5;
            ARM.rightx += 5;
        }
        if(leftleg){
            ManPosition.leftfoot = ManPosition.leftfoot+5;
            ManPosition.rightfoot = ManPosition.rightfoot-5;
            ARM.leftx += 5;
            ARM.rightx -= 5;
        }
        let bottom = Math.abs(ManPosition.leftfoot - ManPosition.rightfoot)/2;
        let height = 50-parseInt(Math.sqrt(2500-bottom*bottom));
        ManPosition.legy = 390+height;
        ManPosition.y = 300+height;
        ARM.y = ManPosition.y+20;
        ARM.army = ARM.y+50-height;
        drawWays();
        if(bottom>45){
            clearInterval(times);
            stopMove();
            gameOver();
            text.innerText="裤裆扯了";
        }
    }
    function startMove(){
        if(rightleg){
            ManPosition.movery = ManPosition.movery - 5;
        }else{
            ManPosition.movely = ManPosition.movely - 5;
        }
        
        times = setInterval(moveMap,25);
    }
    function stopMove(){
        clearInterval(times);
        ManPosition.movery = ManPosition.movely = 440;
        drawWays();
        for(let i = 1;i<points.length;i++){
            if( (ManPosition.rightfoot>points[i]-10 && ManPosition.rightfoot<points[i]+10) || (ManPosition.leftfoot >points[i]-10 && ManPosition.leftfoot<points[i]+10)){
                gameOver();
                text.innerHTML =  words[Math.floor(Math.random()*words.length)]+"!";
            }
        }
        var temp = leftleg;
        leftleg = rightleg;
        rightleg = temp;
    }
    canvas.onmousedown=startMove;
    canvas.onmouseup=stopMove;
    // canvas.ontouchstart = startMove;
    // canvas.ontouchend = stopMove;
    begin.onclick = function(){
        start.style.display = "none";
        init();
    }
    restart.onclick = function(){
        gameover.style.display = "none";
        init();
    }
    function startGame(){
        start.style.display="block";
        
    }
    function gameOver(){
        text.nextElementSibling.innerHTML="共行走"+Math.floor(longs/15)+"米";
        gameover.style.display="block";
    }
    window.onload=function(){
      startGame();
    }
})();