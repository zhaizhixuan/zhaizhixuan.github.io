window.onload = function() {

	//需求
	//	1.点击开始游戏按钮  自己消失 分数盒子左移  带有动画效果
	//	2。出现小图片 一个一个往下掉
	//  3.小图片掉落出去 失分盒子 加分  抖动  掉落10个时候 结束游戏
	//  4.小图片 掉落中 过程 点击 图片 出现抖动 自己变灰色  消失  加分

	//	1.点击开始游戏按钮  自己消失 分数盒子左移带有动画效果
	
	var btn = document.querySelector('.btn');
	var ul = document.querySelector('.ul');
	var t='';// 
	//	点击事件
	btn.onclick = function() {
		//开始按钮消失
		MTween({
			obj: btn,
			attrs: {
				bottom: '-50px'
			},
			duration: 800
		});
		//		 计分盒子消失
		MTween({
			obj: ul,
			attrs: {
				left: '5px'
			},
			duration: 800,
			callBack: function() { //在盒子移开之后 开始出现小图片小落
				manMove();
			}
		});

	}
	//	人物出现函数
	function manMove() {
		
		//获取游戏界面盒子
		var box = document.querySelector('.game-box');
		var man=box.querySelector('.man');
//		var span = '<span style="background-color:pink;width:30px;position: absolute;top:0;height:30px;display:inline-block;background-size:100%;left:' + Math.round(Math.random() * 500 + 100) + 'px;"></span>';
		var random = Math.round(Math.random() * 500 + 70)+'px';
		
		man.style.display="block";//显示
		man.style.left=random;//定位左边的 值 是个随机数
		man.style.top="-10px";

		//让人物运动
		t=MTween({
			obj: man,
			attrs: {
				top: '400px'
			},
			duration: 3000,
			callBack: function() {

				var minus = document.querySelector('.minus'); //获取失分元素
				var gameBox = document.querySelector('.game-box'); //抖动盒子
				minus.innerHTML = parseInt(minus.innerHTML) - 1 + '分'; //减分
				shake(gameBox, 'marginTop', 50, 5, function() {
					//需要在另一个人物 重新执行以上代码
					//						第归需要有条件 否则死循环s
					//						在次出现人物的条件是 一直游戏下,到5分就不执行
					if(minus.innerHTML != '-5分') {
						manMove();
					} else {
						alert('哈哈!输了吧!!');
					}

				});
			}
		})
		manOnclick();//人物的点击事件
	}

	//		人物点击事件
	function manOnclick() {
		var gameBox = document.querySelector('.game-box');
		var man = gameBox.querySelector('span');
		man.style.WebkitFilter = "";//变灰色
		var plus=document.querySelector('.plus');
		man.onclick = function() {
//			man.style.top="-10px";
//			关闭 span下落动画
			clearInterval(t);
			man.isAnim = false;
			//点击人物 自己变灰   消失  加分
			plus.innerHTML=parseInt(plus.innerHTML)+1+'分';
			man.style.WebkitFilter = "grayscale(100%)";//变灰色
			shake(man, 'marginLeft', 50, 5,function(){//抖动
				var man=document.querySelector('.man');
				man.style.display="none";//消失
				manMove();//出现下一个人物
			});

		}
	}

}