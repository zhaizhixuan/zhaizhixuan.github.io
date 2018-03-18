/**
 * Created by 李飞 on 2017/12/5.
 */
//生成左侧栏封装函数
function creatSide(dataSide,sideBox){
    var sideHtml = '';
    for(var key in dataSide){

        var list = '';

        for(var i =0;i<dataSide[key].length;i++){
            list += '<li><a href="javascript:;" mark="'+dataSide[key][i].name+'">'+dataSide[key][i].icon+' <span>'+dataSide[key][i].title+'</span>' +
                '</a></li>';

            console.log(list);

        }

        sideHtml += '<ul>'+list+'</ul>';

    }
    sideBox.innerHTML = sideHtml;
}
//生成文件夹栏封装函数
function creatContent(dataContent,contentBox){

    if(!dataContent){

        console.log('木有内容了');

        contentBox.innerHTML = '木有内容了';

        return false;
    }
    var contentHtml = '';
    for(var i =0;i<dataContent.length;i++){
        contentHtml += '<div class="list-item list-con">'+
            '<a href="javascript:;" mark="'+i+'" key="'+dataContent[i].name+'">'+
            '<div class="check-box"><i class="fa fa-circle-o"></i></div>'+
            '<div class="file"><i class="fa fa-folder"></i></div>'+
            '<div class="name">'+
            '<div class="file-title" style="">'+dataContent[i].title+'</div>'+
            '<div class="edit-time">'+dataContent[i].time+'</div>'+
            '<div class="file-size">'+(dataContent[i].fileSize||'-')+'</div>'+
            '</div>'+
            '</a>'+
            '</div>';
    }
    contentBox.innerHTML = contentHtml;
}
