
let date=new Date();
// let nowDateStr=date.toISOString().slice(0,10);
// let nextDate=new Date();
// nextDate.setDate(date.getDate()+5);
// let nextDateStr=nextDate.toISOString().slice(0,10);

function fetchCurrentWeather(){
  // let weatherObj={};
  fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/hyderabad/${getGivenDate(0)}/${getGivenDate(5)}/?unitGroup=metric&key=ZDU36NL4TTH9ZLC4ESDGVLYXS&contentType=json`)
  .then((result)=>{
     return result.json();
  })
  .then((api_object)=>{
    setHomePage(api_object);
  })
  .catch((er)=>{
    console.log(er);
  })

}
fetchCurrentWeather();
function setHomePage(api_object){
  console.log(api_object)

  let {address}=api_object
  let {feelslike,description,datetime,windspeed,humidity,pressure,visibility,sunrise,sunset,tempmax,tempmin,feelslikemax,feelslikemin,hours}=api_object.days[0];
  // hours is an array which contains 24-hrs climate info
  document.querySelector('.dis-time').innerHTML=date.toString().slice(15,25);
  document.querySelector('.location-js').innerHTML=address;
  document.querySelector('.date-js').innerHTML=datetime;
  document.querySelector('.wind-speed').innerHTML=windspeed;
  document.querySelector('.humidity').innerHTML=humidity;
  document.querySelector('.pressure').innerHTML=pressure;
  document.querySelector('.visibilty').innerHTML=visibility;
  document.querySelector('.sunrise').innerHTML=sunrise;
  document.querySelector('.visibilty').innerHTML=visibility;
  document.querySelector('.sunset').innerHTML=sunset;
  document.querySelector('.today-max-temp').innerHTML=tempmax;
  document.querySelector('.today-max-temp').innerHTML=tempmax;
  document.querySelector('.today-min-temp').innerHTML=tempmin;
  document.querySelector('.feelslikemax').innerHTML=feelslikemax;
  document.querySelector('.feelsLikeMin').innerHTML=feelslikemin;
  //  date.setDate(date.getDate()+2)
   document.querySelectorAll('.today').innerHTML=getDayFn(date.getDay());
   //geting today date and displaying accurately
      let currentTem={}
      hours.map((curent_temp)=>{
        let getHoursInfoVal=getHoursInfo();
        if(getHoursInfoVal===convertToNum(  curent_temp.datetime)){
            currentTem=curent_temp;
        }
      })
      document.querySelector('.curr-temp-js').innerHTML=`${currentTem.temp} ${addDegress()}`;
      document.querySelector('.curr-temp-feel').innerHTML=currentTem.conditions;
  //  console.log(currentTem);

//returns defined day object hrs(6,12,18,22);
 let day2=(getMrngEvngValuesObj(getCurrentDateObj(api_object.days,getGivenDate(1)).hours));
 let day3=(getMrngEvngValuesObj(getCurrentDateObj(api_object.days,getGivenDate(2)).hours));
//  console.log(day2);
// setting day-2 values
 setNextDays(2,day2);
 setNextDays(3,day3);



}
function setNextDaysInfo(obj){
 let {}=obj;
}
function getDayFn(dayNum){
  const days=["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
 return days[dayNum];
}
function getMonthFn(monthNum){
  let months=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
  return months[monthNum];
}
// console.log(getDayFn(0),getMonthFn(0))

function getHoursInfo(){
  let date=new Date();
  return date.getHours();
}
// getHoursInfo();
function convertToNum(dateTime){
 return Number(dateTime.slice(0,2));
}
//returns found date object
function getCurrentDateObj(api_obj_days,date){
   let foundDaysObj;
  api_obj_days.map((obj)=>{
    // console.log(obj);
    if(obj.datetime===date){
      foundDaysObj=obj;
    }
  })
  // console.log(foundDaysObj);
 
  return foundDaysObj;
}
//gives 4 time line temp of given hour
function getMrngEvngValuesObj(hours){
    let arr=[];
  hours.map((time_obj)=>{
    if(time_obj.datetime==="06:00:00"||time_obj.datetime==="12:00:00"||time_obj.datetime==="18:00:00"||time_obj.datetime==="22:00:00"){
     arr.push(time_obj);
    }
   })
  //  console.log(arr);
   return arr;
}
function getGivenDate(count){
  let nextDate=new Date();
   nextDate.setDate(nextDate.getDate()+count);
  let nextDateStr=nextDate.toISOString().slice(0,10);
  return nextDateStr;
}
function addDegress(){
  return  "&degc";
}

function setNextDays(dayCount,dayObject){
  let day=dayObject;
// daycount=2
//mrng-6am
  document.querySelector(`.day-${dayCount}-mrng`).innerHTML=`${date.getDate()+dayCount-1} ${getMonthFn(date.getMonth())} ${getDayFn(date.getDay()+dayCount-1)}`;
 document.querySelector(`.day-${dayCount}-6am-temp`).innerHTML=`${day[0].temp} ${addDegress()}`;
 document.querySelector(`.day-${dayCount}-6am-condition`).innerHTML=day[0].conditions;
//afternoon-12pm
 document.querySelector(`.day-${dayCount}-afternoon`).innerHTML=`${date.getDate()+dayCount-1} ${getMonthFn(date.getMonth())} ${getDayFn(date.getDay()+dayCount-1)}`
 document.querySelector(`.day-${dayCount}-12pm-temp`).innerHTML=`${day[1].temp} ${addDegress()}`;
 document.querySelector('.day-2-12pm-condition').innerHTML=day[1].conditions;
//evng-6pm
 document.querySelector(`.day-${dayCount}-evng`).innerHTML=`${date.getDate()+dayCount-1} ${getMonthFn(date.getMonth())} ${getDayFn(date.getDay()+dayCount-1)}`;
 document.querySelector(`.day-${dayCount}-6pm-temp`).innerHTML=`${day[2].temp} ${addDegress()}`;
 document.querySelector('.day-2-6pm-condition').innerHTML=day[2].conditions;
//night-10pm
 document.querySelector(`.day-${dayCount}-night`).innerHTML=`${date.getDate()+dayCount-1} ${getMonthFn(date.getMonth())} ${getDayFn(date.getDay()+dayCount-1)}`
 document.querySelector(`.day-${dayCount}-10pm-temp`).innerHTML=`${day[3].temp} ${addDegress()}`;
 document.querySelector('.day-2-10pm-condition').innerHTML=day[3].conditions;
}