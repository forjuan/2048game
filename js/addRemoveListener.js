var EventUtil = {
          //为某元素添加监听事件
          addHandler:function (element,type,handler){
                   if(element.addEventListener)
                    {
                      element.addEventListener(type,handler,false);
                    }
                    else if(element.attachEvent)
                    {
                       element.attachEvent("on"+type,handler); 
                    }
                    else {
                      element["on"+type] = null;
                    }
          },
          //为某元素移出监听事件
          removeHandler:function (element,type,handler){
                   if(element.removeEventListener)
                    {
                      element.removeEventListener(type,handler,false);
                    }
                    else if(element.detachEvent)
                    {
                       element.detachEvent("on"+type,handler); 
                    }
                    else {
                      element["on"+type] = null;
                    }
          },
          //跨浏览器的事件对象
          getEvent:function(event){
                  return event ? event:window.event;
          },
          getTarget:function(event){
                  return event.target || event.srcElement;//IE事件对象不同
          },
          preventDefault:function(event){
                 if (event.preventDefault)
                 {
                       event.preventDefault();
                 }else {
                    event.returnValue = false;
                 }
          },
          stopPropagation: function(event){
                 if(event.stopPropagation)
                 {
                     event.stopPropagation();
                 }else {
                     event.cancelBubble = true;
                 }
          },
          //在mouseover 和mouseout事件中，event对象的 relatedTarget属性提供相关元素信息，ＩE中支持fromElement和toElement
          getRelatedTarget:function(event){
                if(event.relatedTarget){
                  return event.relatedTarget;
                }
                else if(event.toElement){
                  return event.toElement;
                }else if(event.fromElement){
                  return event.fromElement;
                }else {
                  return null;
                }
          },
          //鼠标滚动事件中，获取鼠标滚轮增量值（deIta)
          getWheelDelta:function(event){
               if (event.wheelDelta){
                  return (client.engine.opera && client.engine.opera <9.5 ? -event.wheelDelta : event.wheelDelta);
               }else {
                  return -event.detail * 40; 
               }
          }
     }