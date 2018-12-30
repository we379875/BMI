var height = document.getElementById('cm');
var weight = document.getElementById('kg');
var result = document.querySelector('.result');
var getResult = document.querySelector('.getResult');
var renew = document.querySelector('.renew');
var list = document.querySelector('.list');
var deleteAll = document.querySelector('.deleteAll');
var body = document.body;

var data = JSON.parse(localStorage.getItem('bmiData')) || [];

getResult.addEventListener('click',updateList,false);
renew.addEventListener('click',updateList,false);
list.addEventListener('click',toggleDone,false);
deleteAll.addEventListener('click',deleteAllList,false);
body.addEventListener('keydown',enter,false);


showResult();

function updateList(e){
    var situation;
    var bmiSituation = {
        thin:{
            content : '  過輕',
            color : '#31BAF9'
        },
        normal:{
            content : '  理想',
            color : '#86D73F'
        },
        heavy:{
            content : '  過重',
            color : '#FF982D'
        },
        littleFat:{
            content : '輕度肥胖',
            color : '#FF6C03'
        },
        fat:{
            content : '中度肥胖',
            color : '#FF6C03'
        },
        superFat:{
            content : '重度肥胖',
            color : '#FF1200'
        }
    }

    e.preventDefault();

    if(isNaN(height.value) || isNaN(weight.value) || height.value=="" || weight.value==""){
        alert('請輸入數字');
    }else{
        var bmi = (weight.value/((height.value/100)*(height.value/100))).toFixed(2);
        if(bmi<18.5){
            situation = 'thin';
        }
        else if(18.5<=bmi && bmi<25){
            situation = 'normal';
        }
        else if(25<=bmi && bmi<30){
            situation = 'heavy';
        }
        else if(30<=bmi && bmi<35){
            situation = 'littleFat';
        }
        else if(30<=bmi && bmi<35){
            situation = 'fat';
        }
        else if(35<=bmi){
            situation = 'superFat';
        }

        getResult.setAttribute('style','display:none');
        result.setAttribute('style','display:block;color:'+bmiSituation[situation].color+';border: 7px solid '+bmiSituation[situation].color);
        renew.setAttribute('style','background: '+bmiSituation[situation].color);

        document.querySelector('.bmiIndex').innerHTML = bmi+'<span><br>BMI</span>'
        document.querySelector('.situation').innerHTML = bmiSituation[situation].content;

        var sendData = {
            height:height.value,
            weight:weight.value,
            bmi:bmi,
            situations:bmiSituation[situation].content,
            color:bmiSituation[situation].color,
            date:new Date().getMonth()+1+'-'+new Date().getDate()+'-'+new Date().getFullYear()
        };

        data.push(sendData);
        localStorage.setItem('bmiData',JSON.stringify(data));
        showResult();
    }
}

function showResult(){
    var str = "";
    for(var i=0;i<data.length;i++){
        str += '<li style="border-left: 7px solid '+data[i].color+';">'+
                    '<ul class="listContent clearfix">'+
                        '<li class="situation">'+data[i].situations+'</li>'+
                        '<li class="unit">BMI <i>'+data[i].bmi+'</i></li>'+
                        '<li class="unit">weight <i>'+data[i].weight+'</i></li>'+
                        '<li class="unit">height <i>'+data[i].height+'</i></li>'+
                        '<li class="date">'+data[i].date+'</li>'+
                        '<a href="#" class="delete" data-num="'+i+'">x</a>'+
                    '</ul>'+
                '</li>'
    }
    
    
    list.innerHTML = str;
    
    if(data==""){
        deleteAll.innerText = "";
    }else{
        deleteAll.innerText = '刪除全部';
    }
}

function toggleDone(e){
    e.preventDefault();
    
    if(e.target.nodeName !== 'A'){return};
    var index = e.target.dataset.num;
    console.log(index);
    data.splice(index,1);
    localStorage.setItem('bmiData',JSON.stringify(data));
    showResult(data);
}

function deleteAllList(e){
    e.preventDefault();

    data.splice(0,data.length);
    localStorage.setItem('bmiData',JSON.stringify(data));
    showResult(data);
}

function enter(e){
    if(e.keyCode==13){
        updateList(e);
    }
}