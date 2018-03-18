/**
 * Created by 李飞 on 2017/12/5.
 */
// 标记侧边栏
function sideMark(objList,pageNow){
    var siteClassName = null;

    for(var i =0;i<objList.length;i++){
        if(objList[i].getAttribute('mark')==pageNow){
            if(objList[i].className){
                objList[i].className = ' active';
            }else{
                objList[i].className = 'active';
            }
            siteClassName = objList[i];
            break;
        }
    }
    return siteClassName;
}
// 通过seach url值匹配data中的数据
function seachUrl(arr,data){
    var routeArr = [];

    routeArr = arr.split('_');

    var list_content = data[routeArr[0]];
    console.log(data[routeArr[0]]);

    for(var i =1;i<routeArr.length;i++){

        list_content = list_content[routeArr[i]].child;


    }
    return list_content;
}
// 通过seach url值匹配data中的数据
// <a href="#">全部</a> &gt; <a href="#">QQ网盘</a>
function breadXue(arr,data){

    var breadArr = [];

    breadArr = arr.split('_');

    var list_content = data[breadArr[0]];

    var html = '<a href="#">全部</a> &gt;'

    for(var i =1;i<breadArr.length;i++){

        if(i>=breadArr.length-1){
            html += '<span>'+list_content[breadArr[i]].title+'</span>';

            break;
        }

        html += '<a href="javascript:;" mark="'+i+'">'+list_content[breadArr[i]].title+'</a> &gt; ';

        list_content = list_content[breadArr[i]].child;


    }
    return html;
}