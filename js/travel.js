var xhr = new XMLHttpRequest();
xhr.open('get','https://data.kcg.gov.tw/api/action/datastore_search?resource_id=92290ee5-6e61-456f-80c0-249eae2fcc97',false);

xhr.send(null);
var data = JSON.parse(xhr.responseText);


var areaList = [];
var len = data.result.records.length;
for(var i=0;i<len;i++){
    areaList.push(data.result.records[i].Zone);
}

var areas = [];
areaList.forEach(function(value){
    if(areas.indexOf(value)==-1){
        areas.push(value);
    }
});


var area = document.querySelector('.area');

for(var i=0;i<areas.length;i++){
    var str = document.createElement('OPTION');
    str.setAttribute('value',areas[i])
    str.textContent = areas[i];
    area.appendChild(str);
}

area.addEventListener('change',changeList,false);

function changeList(e){
    select = e.target.value;

    updateList(select);
}


var hotArea = document.querySelectorAll('.hotArea a');

for(var i=0;i<hotArea.length;i++){
    hotArea[i].addEventListener('click',clickList,false)
}

function clickList(e){
    e.preventDefault();
    select = e.target.textContent;
    area.value = select;
    
    updateList(select);
}


function updateList(select){
    h2 = document.querySelector('.content h2');

    // select = e.target.value;
    list = document.querySelector('.card')
    var str = '';
    for(var i=0;i<len;i++){
        if(select==areaList[i]){
            h2.textContent = data.result.records[i].Zone;

            var name = data.result.records[i].Name
            var img = data.result.records[i].Picture1;
            var time = data.result.records[i].Opentime;
            var address = data.result.records[i].Add;
            var tel = data.result.records[i].Tel;
            var ticket = data.result.records[i].Ticketinfo;

            str+=
                '<li>'+
                    '<div class="pic">'+
                        '<img src="'+data.result.records[i].Picture1+'" alt="高雄願景館">'+
                        '<h3>'+data.result.records[i].Name+'</h3>'+
                        '<p>'+data.result.records[i].Zone+'</p>'+
                    '</div>'+
                    '<ul class="info">'+
                        '<li class="time">'+data.result.records[i].Opentime+'</li>'+
                        '<li class="address">'+data.result.records[i].Add+'</li>'+
                        '<li class="tel">'+data.result.records[i].Tel+'</li>'+
                        '<li class="ticket">'+data.result.records[i].Ticketinfo+'</li>'+
                    '</ul>'+    
                '</li>'
        }
    }
    list.innerHTML = str;
}

$(".top").click(function(event) {
    /* Act on the event */
    event.preventDefault();
    $("html,body").animate({scrollTop:0}, 500)
}); 



