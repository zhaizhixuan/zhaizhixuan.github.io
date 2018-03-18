window.onload = function() {

	//	需求 :点击加   num 的内容加1 点击减 num 的内容减1
	//		获取元素 加 减 和num
	//	点击加   num 的内容加1  b 里面的值发生更改

	var lists = document.querySelectorAll('.list');
	var sum = document.querySelector('#sum');
	var alljian = document.querySelectorAll('.num1');
	var bs = document.querySelectorAll('b');
	var zongjia = document.querySelector('#zongjia');
	var maxText = document.querySelector('#maxtext');
	var prices = document.querySelectorAll('.price');
	//	console.log(alljian);

	//	循环 
	for(var i = 0; i < lists.length; i++) {
		abc(lists[i]);
	}

	function abc(oli) {
		var num = 0;
		var plus = oli.querySelector('.list .plus');
		var minus = oli.querySelector('.list .minus');
		var num1s = oli.querySelector('.list .num1');
		var tots = oli.querySelector('b');
		var prices = oli.querySelector('.price');
		var pri = parseFloat(prices.innerHTML);

		plus.onclick = function() {
			num++;
			num1s.innerHTML = num;
			tots.innerHTML = num * pri;

			fn();
			allprice();
			max();
		}
		minus.onclick = function() {
			num--;
			if(num < 0) {
				num = 0;
			}
			num1s.innerHTML = num;
			tots.innerHTML = num * pri;

			fn();
			allprice();
			max();
		}

	}
	//	件数总计

	function fn() {
		var total = 0;
		for(var i = 0; i < alljian.length; i++) {
			total += parseInt(alljian[i].innerHTML);
		}
		sum.innerHTML = total;
	}
	//		总价
	function allprice() {
		var apc = 0;

		for(var i = 0; i < bs.length; i++) {
			apc += parseFloat(bs[i].innerHTML);
		}
		zongjia.innerHTML = apc;
	}

	//	最大单价

	function max() {
		var maxnum = 0;
		for(var i = 0; i < prices.length; i++) {
			var num = parseFloat(prices[i].innerHTML);
			if(num > maxnum && parseFloat(alljian[i].innerHTML) > 0) {
				maxnum = num;
			}

		}
		maxText.innerHTML = maxnum;

	}

}