/**
 * Created by 李飞 on 2017/11/30.
 */
//  头部JS模块
// 获取任务按钮
// task任务栏点击事件函数
function headTskBtn(obj1,obj2){

    obj1.onclick = function (ev) {

        var ev = ev||event;

        ev.preventDefault();
        var that = this;
        if(!this.state){
            this.style.color = 'skyblue';

            setTimeout(function(){
                that.state = true;
            },20);


            obj2.style.transform = 'scale(1)';

        }else{

            this.style.color = '';

            setTimeout(function(){
                that.state = false;
            },20);
            obj2.style.transform = 'scale(0)';

        }
    }

    obj2.onclick = function(ev){
        var ev = ev||event;
        ev.stopPropagation();
        ev.cancelBubble = true;
    };

    var tasktitle = document.querySelectorAll('.tasktitle');
    var line = document.querySelector('.line');
    var l = line.offsetLeft;

    var w = tasktitle[0].offsetWidth;

    line.style.width = w +'px';

    tasktitle[0].style.color = 'skyblue';

    for(var i =0;i<tasktitle.length;i++){

        tasktitle[i].onclick = function(){
            if(this.previousElementSibling){
                this.previousElementSibling.style.color = '';
            }else{
                this.nextElementSibling.style.color = '';
            }
            this.style.color = 'skyblue';
            w = this.offsetWidth;
            var l1 = this.offsetLeft;
            MTween({
                obj:line,
                attrs:{
                    left:l1+'px',
                    width:w +'px'
                },
                duration:200
            });

        }
    }
}
// seach搜索框
function headSeach(obj1){

    var w = obj1.offsetWidth;

    obj1.onfocus = function () {
        MTween({
            obj:this,
            attrs:{
                width:w+50+'px'
            },
            duration:200
        });

        this.style.borderColor = '#E9cfF1';
    };
    obj1.onblur = function () {
        MTween({
            obj:this,
            attrs:{
                width:w+'px'
            },
            duration:200
        });
        this.style.borderColor = '';
    };
}
// 右侧信息栏
function headMes(obj1,obj2,obj3){
    obj1.onclick = function(ev){

        var that = this;

        if(!this.state){

            obj2.style.transform = 'rotateZ(180deg)';

            obj3.style.display = 'block';

            setTimeout(function(){
                that.state = true;
            },20);

        }else{
            obj2.style.transform = 'rotateZ(0)';

            obj3.style.display = 'none';

            setTimeout(function(){
                that.state = false;
            },20);
        }

    }

    obj3.onclick = function(ev){

        ev.stopPropagation();
    }
}
