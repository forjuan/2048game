//lj,move 移动包含左右上下移动
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
      if(!off) {
        return false;
        }
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
function move(dir){
  var move = 0;
  if(dir == 'left' || dir == 'top'){
    for(var i = 0;i<4;i++){
      for(var j = 0;j< 4;j++){
       if(dir == 'left'){//左边i行j列
          if(loca[i][j].value){
              var tarcol = findtarget(i,j,"left");
              if(j == tarcol) continue;
              var now = findindex(i,j);
              var pre = findindex(i,tarcol);
              changeData(now,pre,tarcol,i,j,"left");
              move++;
          }
       }else if(dir == 'top'){//向上移动
              if(loca[j][i].value){
                var tarcol = findtarget(j,i,"top");
                if (j == tarcol) continue;
                var now = findindex(j,i);
                var pre = findindex(tarcol,i);
                changeData(now,pre,tarcol,i,j,"top");
                 move++;
              }
      }
    }  
   }//向上和向左移动结束
  }else if(dir == 'down' || dir == "right"){
     for(var i = 0;i<4;i++){
      for(var j = 3;j>=0;j--){
         if(dir == 'right'){//右移动i行J列
            if(loca[i][j].value){
              var tarcol = findtarget(i,j,"right");
              if(tarcol == j) {continue;}
              var now = findindex(i,j);
              var pre = findindex(i,tarcol);
              changeData(now,pre,tarcol,i,j,"right");
              move++;
            }
         }else if(dir == 'down'){//下移动i列j行
            if(loca[j][i].value){
            var tarcol = findtarget(j,i,"down");
            if(tarcol == j) {continue;}
            var now = findindex(j,i);
            var pre = findindex(tarcol,i);
            changeData(now,pre,tarcol,i,j,"down");
            move++;
           }
        }
      }
    }
  }
  for(i=0;i<box.length;i++){
       box[i].change = false;
        if(box[i].value <=512 ){
          box[i].style.fontSize = "60px";
       }
    }
    if(move++){//有移动才产生新值
        radom(playOff);
    }
}
function findtarget(m,n,dir){
    var col= undefined;
    if(dir == "down"){
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
             if (box[now].value == box[rep].value && !box[rep].change){//若值相等并且被替换的div没有被改变过值
              changevalue(now,rep);
              box[now].change = true;//如果改变成2倍值
               return col; 
             }else {//不相等
              return col-1;
            }
       }
    }else if(dir == "left"){
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
           if (box[now].value == box[rep].value && !box[rep].change){//若值相等并且被替换的div没有被改变过值
              changevalue(now,rep);
              box[now].change = true;//如果改变成2倍值
              return col; 
           }else {//不相等
             return col+1;
          }
    }
    }else if(dir == "top"){
        for(var j = m;j>=0;j--){//最top边的空值 
               if(loca[j][n].value && j!=m){//从左往右第一个有值的位置
                  col=j;//找到第一个就退出循环
                  break;
               }
        }
        if(col == undefined) {//该行最上边列位置是目标位置
              return 0;
        }else {
            var now = findindex(m,n);
            var rep = findindex(col,n);
         if (box[now].value == box[rep].value && !box[rep].change){//若值相等并且被替换的div没有被改变过值
            changevalue(now,rep);
             box[now].change = true;//如果改变成2倍值
               return col; 
            }else {//不相等
               return col+1;
            }
       }
    }else if(dir == "right"){
       for(var j = n;j<4;j++){//最you边的空值 
           if(loca[m][j].value && j!=n){//从左往右第一个有值的位置
              col=j;//找到第一个就退出循环
              break;
           }
       }


       if(col == undefined) {//该行最右边列位置是目标位置
            return 3;
        }else{
              var now = findindex(m,n);
              var rep = findindex(m,col);
             if (box[now].value == box[rep].value && !box[rep].change){//若值相等并且被替换的div没有被改变过值
               changevalue(now,rep);
                box[now].change = true;//如果改变成2倍值
               return col; 
             }else {//不相等
              return col-1;
            }
       }
    }
};
function changevalue(now,rep){
                  box[now].value = 2*box[now].value;
                  box[rep].value = 0;
                  box[rep].innerHTML = "";
                  color(box[rep]);
                  if(box[now].value>512){
                     box[now].style.fontSize = "40px";
                  }
};
function changeData(now,pre,tarcol,i,j,dir){//每次移动时改变值
     if(dir ==  "top"){
            box[now].x = tarcol;//改变的只有hang
            box[now].y = i;
            box[pre].x = j;
            box[pre].y = i;//改变对应的坐标值
            box[pre].style.top = loca[j][i].top + 'px';//移动位置
            box[now].style.top = loca[tarcol][i].top + "px";
            loca[j][i].value = false;
            loca[tarcol][i].value =true;
     }else if(dir == 'left'){
            box[pre].style.left = loca[i][j].left + 'px';//移动位置
            box[now].style.left = loca[i][tarcol].left+"px";
            box[now].x = i;//改变的只有列
            box[now].y = tarcol;
            box[pre].x = i;
            box[pre].y = j;//改变对应的坐标值
            loca[i][j].value = false;
            loca[i][tarcol].value =true;
     }else if(dir == 'down'){
            box[now].style.top = loca[tarcol][i].top+"px";
            box[pre].style.top = loca[j][i].top + 'px';//移动位置
            box[now].x = tarcol;
            box[now].y = i;
            box[pre].x = j;
            box[pre].y = i;//改变对应的坐标值  
            loca[j][i].value = false;//当前没值
            loca[tarcol][i].value =true;//有值
     }else if(dir == 'right'){
            box[now].style.left = loca[i][tarcol].left+"px";
            box[pre].style.left = loca[i][j].left + 'px';
            box[now].x = i;
            box[now].y = tarcol;
            box[pre].x = i;
            box[pre].y = j;//改变对应的坐标值
            loca[i][j].value = false;//当前没值
            loca[i][tarcol].value =true;//有值
     }
            box[now].innerHTML = box[now].value;
            color(box[now]);
            
};
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
	  move("left");
    gameover();
	};
  top.onclick = function (){
    move("top");
    gameover();
  };
  right.onclick = function (){
    move("right");
    gameover();
  };
  bottom.onclick = function (){
    move("down");
    gameover();
  };
  EventUtil.addHandler(document,"keyup",function(event){
       event = EventUtil.getEvent(event);
       if(event.keyCode == 37){
            move("left");
            gameover();
       }else if(event.keyCode == 38){
           move("top");
           gameover();
       }else if(event.keyCode == 39){
           move("right");
           gameover();
       }else if(event.keyCode == 40){
           move("down");
           gameover();
       }
  });
};
