var div = document.getElementById("playarea");
var loca = new Array(4);//位置
    for(var i=0;i<loca.length;i++){
       loca[i] = new Array(4);
    }
var box = div.getElementsByTagName("div");//每个div
var playOff=false;//是否开始游戏
function coordilate(){
	var width = box[0].offsetWidth;
	var height = box[0].offsetHeight;
	for (i = 0;i< box.length/4;i++){//i行j列初始布局
	   for(var j = 0; j<box.length/4;j++){
         box[i*4+j].style.left =  10*(j+1) +width*j +"px";
         box[i*4+j].style.top = 10*(i+1)+height*i + "px";
         box[i*4+j].value = 0;
         box[i*4+j].x = i;//box对应行位置
         box[i*4+j].y = j;//box对应列位置
         box[i*4+j].innerHTML = '';
         color(box[i*4+j]);
         loca[i][j] = {
             left: parseInt(box[i*4+j].style.left),
             top: parseInt(box[i*4+j].style.top),
             value:false
         };
	   }
	}
};
function radom(off) {//随机产生一个空位置
       if(!off) { return false;}
    	var radomvalue = 2*Math.floor(Math.random()*2+1);//随机值
    	var empty = [];
    	var count = 0;
    	for(var i=0;i<box.length;i++){//空的数量
    	  if(box[i].value == 0){
             count++;
             box[i].count = count;
             box[i].change = false;//是否被更改过
    	  }
    	}
     var radomlo = Math.floor(Math.random()*count+1);//随机出现的空位置
    	for(i=0;i<box.length;i++){//随机出现的那个空位置的内容为随机值
              if( box[i].count == radomlo){
                 box[i].value = radomvalue;
                 box[i].innerHTML = radomvalue;
                 color(box[i]);//颜色值
                 loca[box[i].x][box[i].y].value = true;//坐标上有值
              }
              box[i].count = 0;
           }
};
function color(obj){//颜色值
   if(obj.value == 2){
        obj.style.background = '#EEE4DA';
     }else if(obj.value == 4){
        obj.style.background = '#EDE1CB';
     }else if(obj.value == 8){
        obj.style.background = '#F2B179';
     }else if(obj.value == 16){
        obj.style.background = '#F69465';
     }else if(obj.value == 32){
        obj.style.background = '#F87A63';
     }else if(obj.value == 64){
        obj.style.background = '#F66500';
     }else if(obj.value == 128){
        obj.style.background = '#f6dc8b';
     }else if(obj.value == 256){
        obj.style.background = '#f8cc47';
     }else if(obj.value == 512){
        obj.style.background = '#f6c01b';
     }else if(obj.value == 1024){
        obj.style.background = '#f7ac0c';
     }else if(obj.value == 2048){
        obj.style.background = '#fbb44f';
     }else if(obj.value == 0){
        obj.style.background = '#CCC0B2';
     }
};
function moveLeft(){
    var move = 0;
    var left =0,top =0;
    for(var i = 0;i<4;i++){
      for(var j = 0;j< 4;j++){
        if(loca[i][j].value){
            var tarcol = findtargetL(i,j);
            if(j == tarcol) continue;
            var now = findindex(i,j);
            var pre = findindex(i,tarcol);
            box[pre].style.left = loca[i][j].left + 'px';//移动位置
            box[now].style.left = loca[i][tarcol].left+"px";
            box[now].x = i;//改变的只有列
            box[now].y = tarcol;
            box[pre].x = i;
            box[pre].y = j;//改变对应的坐标值
            box[now].innerHTML = box[now].value;
            color(box[now]);
            loca[i][j].value = false;
            loca[i][tarcol].value =true;
            move++;
            box[now].change = true;
        }
      }
    }
    for(i=0;i<box.length;i++){
       box[i].change = false;
    }
    if(move++){//有移动才产生新值
       moveL = true;
      radom(playOff);
    }else{
      moveL = false;
    }
};
function findtargetL(m,n){
    //找到左边第一个值为非空值
    var col= undefined;
    for(var j = n;j>=0;j--){//最左边的空值 min ：有几个空位
           if(loca[m][j].value && j!=n){//从左往右第一个有值的位置
              col=j;
              break;
           }
    }
    if(col == undefined) {//该行最左边列位置是目标位置
          return 0;
    }else {
        var now = findindex(m,n);
        var rep = findindex(m,col);

        if (box[now].value == box[rep].value && !box[rep].change){
            box[now].value = 2*box[now].value;
            box[rep].value = 0;
            box[rep].innerHTML = "";
            color(box[rep]);
           if(box[now].value>512){
               box[now].style.fontSize = "40px";
            }
           return col; 
        }else {//不相等
           return col+1;
        }
    }
};
function findtargetT(m,n){
    //找到上边第一个非空值
    var row= undefined;
    for(var j = m;j>=0;j--){//最top边的空值 
           if(loca[j][n].value && j!=m){//从左往右第一个有值的位置
              row=j;//找到第一个就退出循环
              break;
           }
    }
    if(row == undefined) {//该行最上边列位置是目标位置
          return 0;
    }else {
        var now = findindex(m,n);
        var rep = findindex(row,n);
        if (box[now].value == box[rep].value && !box[rep].change){//若值相等
            box[now].value = 2*box[now].value;
            box[rep].value = 0;
            box[rep].innerHTML = "";
            color(box[rep]);
          if(box[now].value>512){
               box[now].style.fontSize = "40px";
            }
           return row; 
        }else {//不相等
           return row+1;
        }
    }
};
function moveTop(){
    var move = 0;
    var left =0,top =0;
    for(var i = 0;i<4;i++){//i列
      for(var j = 0;j< 4;j++){//j行
        if(loca[j][i].value){
            var tarcol = findtargetT(j,i);
            if (j == tarcol) continue;
            var now = findindex(j,i);
            var pre = findindex(tarcol,i);
            box[now].x = tarcol;//改变的只有hang
            box[now].y = i;
            box[pre].x = j;
            box[pre].y = i;//改变对应的坐标值
            box[now].innerHTML = box[now].value;
            box[pre].style.top = loca[j][i].top + 'px';//移动位置
            color(box[now]);
            loca[j][i].value = false;
            loca[tarcol][i].value =true;
            box[now].style.top = loca[tarcol][i].top + "px";
            box[now].change = true;
            move++;
        }
      }
    }
    for(i =0; i<box.length;i++){
       box[i].change = false;
    }
    if(move++){//有移动才产生新值
        moveT = true;
        radom(playOff);
    }else{
        moveT = false;
    }
}

function findtargetR(m,n){
    //找到右边第一个非空值
    var col= undefined;
    for(var j = n;j<4;j++){//最you边的空值 
           if(loca[m][j].value && j!=n){//从左往右第一个有值的位置
              col=j;//找到第一个就退出循环
              break;
           }
    }
    if(col == undefined) {//该行最右边列位置是目标位置
          return 3;
    }else {
        var now = findindex(m,n);
        var rep = findindex(m,col);
        if (box[now].value == box[rep].value && !box[rep].change){//若值相等
            box[now].value = 2*box[now].value;
            box[rep].value = 0;
            box[rep].innerHTML = "";
            color(box[rep]);
          if(box[now].value>512){
               box[now].style.fontSize = "40px";
            }
           return col; 
        }else {//不相等
           return col-1;
        }
    }
}
function moveRight(){
    var move = 0;
    var left =0,top =0;
    for(var i = 0;i<4;i++){//i行
      for(var j = 3;j>=0;j--){//j列
        if(loca[i][j].value){
            var tarcol = findtargetR(i,j);
            if(tarcol == j) {continue;}
            console.log("tarcol"+tarcol);
            var now = findindex(i,j);
            var pre = findindex(i,tarcol);
            box[now].style.left = loca[i][tarcol].left+"px";
            box[now].x = i;
            box[now].y = tarcol;
            box[pre].x = i;
            box[pre].y = j;//改变对应的坐标值
            box[now].innerHTML = box[now].value;
            box[pre].style.left = loca[i][j].left + 'px';//移动位置
            color(box[now]);
            loca[i][j].value = false;//当前没值
            loca[i][tarcol].value =true;//有值
            move++;
            box[now].change = true;
        }
      }
    }
    for(i=0;i<box.length;i++){
       box[i].change = false;
    }
    if(move++){//有移动才产生新值
        moveR = true;
        radom(playOff);
    }else{
       moveR = false;
    }
}
function findtargetD(m,n){
    //找到右边第一个非空值
    var col= undefined;
    for(var j = m;j<4;j++){//最you边的空值 
           if(loca[j][n].value && j!=m){//从左往右第一个有值的位置
              col=j;//找到第一个就退出循环
              break;
           }
    }
    if(col == undefined) {//该行最右边列位置是目标位置
          return 3;
    }else {
        var now = findindex(m,n);
        var rep = findindex(col,n);
        if (box[now].value == box[rep].value && !box[rep].change){//若值相等
            box[now].value = 2*box[now].value;
            box[rep].value = 0;
            box[rep].innerHTML = "";
            color(box[rep]);
            if(box[now].value>512){
               box[now].style.fontSize = "40px";
            }
           return col; 
        }else {//不相等
           return col-1;
        }
    }
};
function moveDown(){
    var move = 0;
    for(var i = 0;i<4;i++){//i列
      for(var j = 3;j>=0;j--){//j行
        if(loca[j][i].value){
            var tarcol = findtargetD(j,i);
            console.log("tarcol"+tarcol);
            if(tarcol == j) {continue;}
            var now = findindex(j,i);
            var pre = findindex(tarcol,i);
            box[now].style.top = loca[tarcol][i].top+"px";
            box[now].x = tarcol;
            box[now].y = i;
            box[pre].x = j;
            box[pre].y = i;//改变对应的坐标值
            box[now].innerHTML = box[now].value;
            box[pre].style.top = loca[j][i].top + 'px';//移动位置
            color(box[now]);
            loca[j][i].value = false;//当前没值
            loca[tarcol][i].value =true;//有值
            move++;
            box[now].change = true;
        }
      }
    }
    for(i=0;i<box.length;i++){
       box[i].change = false;
    }
    if(move++){//有移动才产生新值
        moveD = true;
        radom(playOff);
    }else {
        moveD = false;
    }
}
function findindex(m,n){//(m,n)坐标对应的box 需要更严谨的方法
	for(var i=0;i<box.length;i++){
	   if(box[i].x == m && box[i].y == n){
       // console.log("box[i].x:"+m+"box[i].y:"+n)
	      return i;
	   } 
	} 
  return -1;
};
function gameover(){
    var left,now,top,down,right;
    var over=true;
   for(var i = 0; i<4;i++)
    {
        for(var j=0;j<4;j++){
            now = findindex(i,j);
            left = findindex(i,j-1);
            top = findindex(i-1,j);
            right = findindex(i,j+1);
            down = findindex(i+1,j);
            if(box[left] && box[now].value==box[left].value) //左边存在
            {
               over = false;
            }
            if(box[top] && box[now].value==box[top].value)
            {
               over= false;
            }
            if(box[right] && box[now].value==box[right].value)
            {
               over= false;
            }
            if(box[down] && box[now].value==box[down].value)
            {
               over= false;
            }
            if (box[now].value == 0)
            {
               over= false;
            }

      }
    }
    if(over){
      alert("游戏结束");
    }
};
window.onload = function(){
	var play = document.getElementById("play");
	var control = document.getElementById("key").getElementsByTagName("span");
	var top = control[0];
	var left = control[1];
	var bottom = control[2];
	var right = control[3];
	 coordilate();
	play.onclick = function(){
       if(!playOff){
          playOff = true;
          radom(playOff);
          radom(playOff);
          this.innerHTML = '■';
        }else{
          alert("你想退出游戏吗？");
          this.innerHTML = 'start';
          coordilate();
          playOff = false;
        }
	}; 
	play.onmouseover = function(){
	  this.style.background = '#fa7140';
	};
	play.onmouseout = function(){
	  this.style.background = '#ccc';
	};
	left.onclick = function (){
	  moveLeft();
    gameover();
	};
  top.onclick = function (){
    moveTop();
    gameover();
  };
  right.onclick = function (){
    moveRight();
    gameover();
  };
  bottom.onclick = function (){
    moveDown();
    gameover();
  };
  EventUtil.addHandler(document,"keyup",function(event){
       event = EventUtil.getEvent(event);
       if(event.keyCode == 37){
            moveLeft();
            gameover();
       }else if(event.keyCode == 38){
           moveTop();
           gameover();
       }else if(event.keyCode == 39){
           moveRight();
           gameover();
       }else if(event.keyCode == 40){
           moveDown();
           gameover();
       }
  });
};
