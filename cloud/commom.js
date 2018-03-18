var commonjs = document.querySelector('#commonjs');

require(commonjs);

function require(obj){

    var comSrc = obj.src;

    //找最后一个 / 位置
    var index = comSrc.lastIndexOf('/');
    var _dir = comSrc.slice(0,index+1)+'tween.js';

    var script = document.createElement('script');
    script.src = _dir;

    obj.parentNode.insertBefore(script,obj);
}


/*
* 获取css属性方法
* */
function getStyle(){

    var obj = arguments[0];
    var arr = arguments.length>2?{}:'';

    if(typeof arr=='string'){
        arr = !obj.currentStyle?getComputedStyle(obj)[arguments[1]]:obj.currentStyle[arguments[1]];
    }else{
        for(var i=1;i<arguments.length;i++){
            //arr.height = '';
            arr[arguments[i]] = !obj.currentStyle?getComputedStyle(obj)[arguments[i]]:obj.currentStyle[arguments[i]];
        }
    }



    return arr;
}

/*
* 获取元素集合
* */
function $(str){

    var dom;//储存找到的元素

    if(str.charAt(0)=='.'){
        dom = document.getElementsByClassName(str.slice(1));

    }else if(str.charAt(0)=='#'){
        dom = document.getElementById(str.slice(1));
    }else{
        dom = document.getElementsByTagName(str);
    }

    return dom;//把获取到的元素给到需要用的人
}


//封装move
function move(obj,attr,speed,end,callBack){
    clearInterval(obj.timer);
    obj.timer = setInterval(function(){
        var attrVal = parseFloat(getStyle(obj,attr));

        var s = attrVal+speed;//下一帧的位置


        if(speed<0){
            if(s<=end){
                s=end;
                clearInterval(obj.timer);
            }
        }

        if(speed>0){
            if(s>=end){
                s=end;
                clearInterval(obj.timer);
            }
        }


        obj.style[attr] = s +'px';


//            if(s==end){
//                if(callBack){
//                    callBack();
//                }
//               callBack&&callBack();
//            }

        if(s==end&&callBack){
            //如果到达了目标点，并且有回调函数的情况就执行；
            callBack();
        }

    },30);
}



//MTween 时间版的运动函数
/*function  MTween(obj,attr,begin,end,duration,unit,way,callBack){



    if(obj.isAnim) return;

    //obj开始运动了  自定义属性
    obj.isAnim = true;

    if(!way){ //如果用户没有选择运动方式就默认匀速
        way = 'linear';
    }

    if(!unit){ //如果用户没有传入单位，默认为空
        unit = '';
    }

    // console.log(getStyle(obj,'transform'));

    var start = parseFloat(begin)||parseFloat(getStyle(obj,attr))||0;//起始位置  如果begin未传值，那就就尝试获取传入的属性值，如果属性值获取失败，就默认为0
//        console.log(start);
//        var end = 1000;//目标点
//        var duration = 1000;//动画执行的总时间 单位是毫秒
    var startTime = Date.now();

    var s = end - start; //总路程

//        var v = s/duration; //计算出来的速度


    //每次20ms走一帧
    clearInterval(timer);
    var timer = 0;
    timer = setInterval(function(){

        // console.log(attr);

        var endTime = Date.now();

        //计算出当前时间
        var t = endTime-startTime;

        if(t>=duration){
            t = duration;
            clearInterval(timer);//到达目标点要清除定时器
        }
//            console.log(t,start,s,duration);
//            console.log(Tween[way](t,start,s,duration));

        obj.style[attr] = Tween[way](t,start,s,duration)+unit;

        //透明度的兼容处理
        if(attr=='opacity'){
            obj.style.filter = 'Alpha(opacity='+Tween[way](t,start,s,duration)*100+')';
        }

        //如果是transform的情况
        //transform.scale  ==> ['transform','scale']

        var attr1 = attr.split('.');

        // console.log(attr1);

        if(attr1.length>1&&attr1[0]=='transform'){
            //js设置transform的方式：
            // obj.style.tranform = 'scale(n)';
            // console.log(1);
            if(attr1[1]=='scale'){
                obj.style[attr1[0]] = attr1[1]+'('+Tween[way](t,start,s,duration)+')';
            }else if(attr1[1]=='rotateZ'){
                obj.style[attr1[0]] = attr1[1]+'('+Tween[way](t,start,s,duration)+'deg)';
            }

        }




        if(t==duration){
            obj.isAnim = false;
            //等到上一个动画完成 然后再调用
            if(callBack){
                callBack();
            }
        }


    },20);
}*/

//MTween 时间版的运动函数
function  MTween(opt){

    //end   unit  begin

    var option = {
        obj:'',
        begins:{},
        attrs:{},
        duration:0,
        way:'linear',
        callBack:function(){}
    };

    //用传入的参数覆盖默认值
    for(var key in option){
        if(opt[key]){
            option[key] = opt[key];
        }
    }

    // console.log(option);

    //为了不再修改下面更多的代码，在这里做一次变量的适配
    var obj = option.obj;
    var attrs = option.attrs;
    var duration = option.duration;
    var way = option.way;
    var callBack = option.callBack;
    var begins = option.begins;

//        console.log(Tween[way],way,option.way);
//
//        return;

    if(obj.isAnim) return;

    //obj开始运动了  自定义属性
    obj.isAnim = true;


    var starts = {};

    //获取传入属性的开始位置
    for(var key in attrs){
//            console.log(key);
        starts[key] = parseFloat(begins[key])||parseFloat(getStyle(obj,key))||0;
    }

    // console.log(starts);

    //对应的单位
    var uintes = {};
    for(var key in attrs){
//            console.log(attrs[key]);
        //不是字符串的直接跳出
        if(typeof attrs[key]!='string') continue;

        var num = parseFloat(attrs[key]);
        var arr = attrs[key].split(num);
//            console.log(arr);
        uintes[key] = arr[1];
    }

    // console.log(uintes);

//        var start = parseFloat(begin)||parseFloat(getStyle(obj,attr))||0;//起始位置  如果begin未传值，那就就尝试获取传入的属性值，如果属性值获取失败，就默认为0
//        console.log(start);
//        var end = 1000;//目标点
//        var duration = 1000;//动画执行的总时间 单位是毫秒
    var startTime = Date.now();

    //所有的属性的总路程
    var allS = {};
    for(var key in attrs){
        if(key=='transform.scale'){
            console.log(attrs[key]);
        }
        allS[key] = parseFloat(attrs[key])-starts[key]||0;
    }

    // console.log(allS);
//        var s = end - start; //总路程

//        var v = s/duration; //计算出来的速度


    //每次20ms走一帧
    // console.log(timer);
    clearInterval(timer);
    var timer = 0;
    timer = setInterval(function(){

        // console.log(attr);

        var endTime = Date.now();

        //计算出当前时间
        var t = endTime-startTime;

        if(t>=duration){
            t = duration;
            clearInterval(timer);//到达目标点要清除定时器
        }
//            console.log(t,start,s,duration);
//            console.log(Tween[way](t,start,s,duration));

        //运动的属性
        for(var key in attrs){

            obj.style[key] = Tween[way](t,starts[key],allS[key],duration)+(uintes[key]||'');


            //透明度的兼容处理
            if(key=='opacity'){
                obj.style.filter = 'Alpha(opacity='+Tween[way](t,starts[key],allS[key],duration)*100+')';
            }

            //处理scrollTop
            if(key=='scrollTop'||key=='scrollLeft'){
                obj[key] = Tween[way](t,starts[key],allS[key],duration)+(uintes[key]||'');
            }


            //transform 的处理
            var attr1 = key.split('.');
            if(attr1.length>1&&attr1[0]=='transform'){
                if(attr1[1]=='scale'){
                    obj.style[attr1[0]] = attr1[1]+'('+Tween[way](t,starts[key],allS[key],duration)+')';
                }else if(attr1[1]=='rotateZ'||'rotateY'||'rotateX'){
                    obj.style[attr1[0]] = attr1[1]+'('+Tween[way](t,starts[key],allS[key],duration)+'deg)';
                }

            }


        }




        if(t==duration){
            obj.isAnim = false;
            //等到上一个动画完成 然后再调用
            if(callBack){
                callBack(obj);
            }
        }


    },20);


    obj.clearInterval = function(){
        clearInterval(timer);
        obj.isAnim = false;
    };
}



//抖动函数：
/*
 * obj: 抖动的对象
 * attr: 抖动的属性
 *
 * */
function shake(obj,attr,s,f,callBack){
//        var s = 40; //最大偏移量
//        var f = 10; //衰退值
//        console.log(obj.isShake);
    if(obj.isShake) return;
    obj.isShake = true;

    var oldSite = parseFloat(getStyle(obj,attr));//抖动之前的位置

//    var arr = [-10,10,-5,5,0];
    var arr = [];

//    for(var i=0;i<?;i++){
//        arr[i] = -s;
//        arr[i+1] = s;
//    } for循环无法实现 改用while循环

    while(s>0){ //创造抖动的偏移量集合
        arr[arr.length] = -s;
        arr[arr.length] = s;
        s -= f;
    }
    arr[arr.length] = 0;//加上一个0
//        console.log(arr);

    var num = 0;
    clearInterval(timer);
    var timer = 0;
    timer = setInterval(function(){

        obj.style[attr] = oldSite+arr[num]+'px';
        if(arr[num]==0){
            clearInterval(timer);
            obj.isShake = false;
            callBack&&callBack();
        }
        num++;
    },30);
}


//补0函数：
function format(num){
    return num<10?'0'+num:''+num;
}


//修改search某一个值的函数 如果不传任何参数，将返回一个包含search属性值的对象
function editSearch(name,value,bool){
    var search = window.location.search;// typeof => string


    //如果要修改某个值  先把字符串转成对象

    //?user=yinwei&pwd=123456

    var info = search.substring(1);


    //把对应的信息分组
    var info = info.split('&');


    var searchObj = {};

    //info已经是一个数组，需要遍历拆分
    for(var i=0;i<info.length;i++){

        var arr = info[i].split('=');


        searchObj[arr[0]] = arr[1];
    }


    if(arguments.length==0){
        //如果没有传入任何参数，那么程序就假定用户可能是需要search的对象
        return searchObj;
    }



    searchObj[name] = value;//改值

    //把改好的值在拼接回字符串
    var arr = [];
    var n = 0;
    for(key in searchObj){
        arr[n] = key + '=' +searchObj[key];
        n++;
    }

    search = '';
    for(var i=0;i<arr.length;i++){
        search += arr[i]+'&';
    }

//        console.log(search.slice(0,-1));

    if(bool){ //有时候并不希望直接刷新页面
        return search.slice(0,-1);
    }


    window.location.search = search.slice(0,-1);

}


//拖拽：
function drag(option){

    var opt = {
        obj:option.obj||null,
        move:option.move||null,
        up:option.up||null
    };

    // var fn = function(o,l,t){};

    var div = opt.obj;//偷懒 转换对象

    //给拖拽的元素添加mousedown事件
    div.onmousedown = function(ev){

        var ev = ev || event;

        ev.preventDefault();

        //鼠标当前点：
        var x1 = ev.clientX;
        var y1 = ev.clientY;

        //元素当前的位置：
        var l = div.offsetLeft;
        var t = div.offsetTop;

        document.onmousemove = function(ev){

            var ev = ev || event;

            ev.preventDefault();

            //移动过程中的鼠标位置
            var x2 = ev.clientX;
            var y2 = ev.clientY;


            //计算div要移动的距离
            var x = x2-x1;
            var y = y2-y1;

            // function fn(o,l,t){}

            if(opt.move){
                opt.move(div,l+x,t+y);
            }else{
                //设置div的属性
                div.style.left = l+x+'px';
                div.style.top = t+y+'px';
            }


        };

        document.onmouseup = function(){
            //鼠标抬起取消事件；
            document.onmousemove = null;

            if(opt.up){
                opt.up(div);
            }
        };



    };
}
// 检测碰撞拖拽距离
function boom(o,eles,boomFn,unBoomFn,fn){

    var a1 = o;

    //a1的中心点
    var x1 = getOffset(a1,'offsetLeft')+a1.offsetWidth/2;

    var y1 = getOffset(a1,'offsetTop')+a1.offsetHeight/2;


    //除了被抓到的元素  其他元素都是碰撞元素
    var minObj = {
        s:0, //距离
        o:null //元素
    };
    for(var i=0;i<eles.length;i++){

        //其他的就是被碰撞元素
        var a2 = eles[i];

        //a2 的中心点：
        var x2 = getOffset(a2,'offsetLeft')+a2.offsetWidth/2;

        var y2 = getOffset(a2,'offsetTop')+a2.offsetHeight/2;

        //计算出x和y的距离
        var x = Math.abs(x1-x2);
        var y = Math.abs(y1-y2);

        //碰撞时的最大距离
        var maxW = a1.offsetWidth/2+a2.offsetWidth/2;

        var maxH = a1.offsetHeight/2+a2.offsetHeight/2;
        //已知条件： x ， y  w h
        if(x<=maxW&&y<=maxH){
            if(boomFn) boomFn(a2);

            //检测中心点距离
            var c = Math.sqrt(x*x+y*y);

            if(minObj.o){
                //如有已经有元素了 ，就对比距离（s）值的大小，谁的更小就把谁换进去
                if(c<minObj. s){
                    minObj.s = c;
                    minObj.o = a2;
                }
            }else{
                //没有元素的时候 就把当前这个元素存进去
                minObj.s = c;
                minObj.o = a2;
            }


        }else{
            if(unBoomFn) unBoomFn(a2);
        }


    }

    //如果有里的最近的元素存入，就执行回调
    if(minObj.o) fn&&fn(minObj.o);
}

// 封装鼠标滚轮事件
function mouseWheel(option){
    if(!option){
        console.log('请传入参数');
        return false;
    }
    var opt = {
        obj:option.obj||null,
        up:option.up||null,

        down:option.down||null
    };
    opt.obj.onmousewheel = function (ev) {
        var ev = ev||event;

        if(ev.wheelDelta<0){
            opt.down&&opt.down(ev);
        };
        if(ev.wheelDelta>0){
            opt.up&&opt.up(ev);
        };
    };
    opt.obj.addEventListener('DOMMouseScroll',function(ev){
        var ev = ev||event;
        if(ev.detail<0){
            opt.up&&opt.up(ev);
        };
        if(ev.detail>0){
            opt.down&&opt.down(ev);
        };

    });
}

// 封装拖框函数
function dBox(option){
    if(!option){
        console.log('请传入参数');
        return false;
    };
    var opt = {
        obj:option.obj||null,
        fn:option.fn||null,
        obj1:option.obj1||null,
        fn1:option.fn1||null
    };
    opt.obj.onmousedown = function(ev){

        var ev = ev||event;

        ev.stopPropagation();

        var scrollTop = document.body.scrollTop||document.documentElement.scrollTop;

        var x1 = ev.clientX;

        var y1 = ev.clientY;

        var div = document.createElement('div');

        div.className = 'move';

        div.style.left = x1 + 'px';

        div.style.top = y1 + scrollTop + 'px';

        div.style.display = 'none';

        document.body.appendChild(div);

        div.onclick = function(ev){

            var ev = ev||event;

            ev.preventDefault();

            ev.cancelBubble = true;
        };
        document.onmousemove = function (ev) {
            var ev = ev||event;
            ev.preventDefault();
            ev.stopPropagation();
            ev.cancelable = true;
            var x2 = ev.clientX;

            var y2 = ev.clientY;

            var l = opt.obj.offsetLeft;

            var t = opt.obj.offsetTop;

            var h = opt.obj.clientHeight;

            var w = opt.obj.clientWidth;

            var x =Math.abs(x2-x1);


            var y = Math.abs(y2-y1);


            if(x2-x1<0){
                div.style.left = x1 -x +'px';
            }else{
                div.style.left = x1 +'px';
            }
            if(y2-y1<0){
                div.style.top = y1 -y +'px';
            }else{
                div.style.top = y1 +scrollTop +'px';
            }
            div.style.width = x +'px';

            div.style.height = y + 'px';

            if(x2<l){

                div.style.left = l +'px';

                div.style.width = x1-l +'px';
            }
            if(y2<t){
                div.style.top = t +'px';
                div.style.height = y1-t +'px';
            }
            if(y2>(t+h)){
                div.style.height = (h+t)-y1 + 'px';
            }
            if(x2>(l+w)){
                div.style.width = (w+l)-x1 + 'px';
            }
            if(x>10&&y>10){
                div.style.display = 'block';

                onoff = false;//不允许触发点击事件
                opt.fn&&opt.fn(div);
            }



        };

        document.onmouseup = function (ev) {
            var ev = ev||event;
            ev.preventDefault();
            document.onmousemove = null;

            document.onmouseup = null;

            document.body.removeChild(div);

            setTimeout(function(){
                onoff = true;//不允许触发点击事件
            },20);

            opt.fn1&&opt.fn1(div);




        }


    };
}

//封装删除数组
function delArr(arr){
    var k =0;
    for(i in arr){
        arr.splice(arr[i]-k,1);
        k++;
    }
}
// 封装获取距离body的距离
function getOffset(ele,attr){
    var num = 0;

    offset(ele,attr);

    function offset(ele,attr){

        var t = ele[attr];

        if(ele.offsetParent) {

            var parent = ele.offsetParent;

        }else{

            return;
        }


        num += t;

        if(parent.nodeName.toLowerCase()!='body'){

            offset(parent,attr);
        }
    }
    return num;
}