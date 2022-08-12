const { time } = require('console');
const date = require("./dateUtil");//require('date-and-time');
const lunar= require("./lunarday");
const fs = require('fs');
const DATE_FORMAT = "YYYYMMDD";
const REG_VALID_DATE = /^\d{8}$/;
const REG_VALID_YM = /^\d{6}$/;
const MSG_WRONF_DATE = "无效的日期格式";

var _holidayConf;
var _dayCache={};

function errorRes(message){
    return {
        "ok":false,
        "message":message
    };
}

function okRes(data){
    return {
        "ok":true,
        "data":data
    };
}

function getQinMingJieDate(fullYear) {
    //清明节的日期是不固定的，规律是：闰年开始的前2年是4月4日，闰年开始的第3年和第4年是4月5日
    if(isLeapYear(fullYear) || isLeapYear(fullYear -1)){
        return '0404';
    }
    else{
        return '0405';
    }
}
//判断是否是闰年
function isLeapYear (Year) {
    if (((Year % 4)==0) && ((Year % 100)!=0) || ((Year % 400)==0)) {
        return (true);
    } else { return (false); }
}

//每年法定假日其实是11天，只是每年都会通过调休的方式把假期集中，因此需要识别出真正的法定假日
function isLegalRestDay(dateStr,lunarDay){
    var year = parseInt(dateStr.substring(0,4));
    var qingming = getQinMingJieDate(year);

    var solarDay = dateStr.substring(4,8);
    if(solarDay === "0101"){
        return true; //元旦
    }

    if(["正初一","正初二","正初三"].includes(lunarDay)){
        return true; //春节
    }

    if(solarDay === qingming){
        return true; //清明节
    }

    if(solarDay === "0501"){
        return true; //劳动节
    }

    if(lunarDay === "五初五"){
        return true; //端午节
    }

    if(lunarDay === "八十五"){
        return true; //中秋节
    }

    if(["1001","1002","1003"].includes(solarDay)){
        return true; //国庆节
    }

    return false;
}

function dayInfo(isRestDay,isWeekend,restDesc,dayStr){
    var lunarInfo = lunar.convert(dayStr);
    var ludayDay = lunarInfo.lunarMonth + lunarInfo.lunarDay;
    return  {
        "date":dayStr,
        "lunarDay": ludayDay,
        "isWeekend": isWeekend,
        "isRestday": isRestDay,
        "isLegalRestDay": isLegalRestDay(dayStr,ludayDay),
        "restDesc": restDesc,
        "desc":restDesc
    };
}

function getHolidayConf(){
    if(_holidayConf){
        return _holidayConf;
    }

    var content = fs.readFileSync(__dirname  + '/data/holiday.json');
    _holidayConf = JSON.parse(content);
    return _holidayConf;
}

function getDayType(dayValue){
    if(!dayValue || isNaN(dayValue.getTime())){
        return {}
    };
    
    let dateStr = date.format(dayValue,DATE_FORMAT);
    let datCached = _dayCache[dateStr];
    if(datCached != undefined){
        return datCached;
    }

     let year =  dateStr.substring(0,4);
     let day =  dateStr.substring(4,8);
     var dayOfWeek = dayValue.getDay();
     var isWeekend = (dayOfWeek === 6) || (dayOfWeek  === 0); // 6 = Saturday, 0 = Sunday

     hConf = getHolidayConf();

     yearConf = hConf[year];

    let isRestDay = false;
    let restDesc = "";

    //如果没有该年的配置，就判断是否周六日
    if(yearConf == undefined){
        isRestDay = isWeekend;
        if(isRestDay){
            restDesc = "周末";
        }
    }else{
        if(isWeekend && yearConf.workingdayOnWeekend.includes(day)){
              //补班
            isRestDay = false;
        }else{
           for(const p in yearConf.rest){
               if(day >= p){
                   let detail = yearConf.rest[p];
                   if(day <= detail.endDate){
                     isRestDay = true;
                     restDesc = detail["desc"];
                     break;
                   }
               }
           }

           if(!isRestDay){
            isRestDay = isWeekend;

            if(isRestDay){
                restDesc = "周末";
            }
           }
        }
    }

    datCached = dayInfo(isRestDay,isWeekend,restDesc,dateStr);
    _dayCache[dateStr] = datCached;
    return datCached;
}

function isValidDate(dateStr){
    if(!dateStr){
        return false;
    }

    return REG_VALID_DATE.test(dateStr)
}

function getWorkingDays(startDate,endDate){
   if(!isValidDate(startDate) || !isValidDate(endDate)){
       return errorRes(MSG_WRONF_DATE);
   }

   var start = date.parse(startDate, DATE_FORMAT); 
   var end = date.parse(endDate, DATE_FORMAT); 

   if(start.getTime() > end.getTime()){
       let tmp = start;
       start = end;
       end =tmp;
   }

   let workingDay = 0;
   let weekEnd = 0;
   let publicRestDay = 0;
   let buban = 0;

   while(start.getTime() <= end.getTime()){
      let dayDetail = getDayType(start);

      if(!dayDetail.isRestday){
         workingDay +=1;
         if(dayDetail.isWeekend){
            buban += 1;
            weekEnd += 1;
         }
      }else{
        if(dayDetail.isWeekend){
            weekEnd += 1;
        }else{
            publicRestDay += 1;
        }
      }

      start = date.addDays(start,1);
   }

   return okRes( {
    "workingDay": workingDay,
    "weekEnd": weekEnd,
    "publicRestDay": publicRestDay,
    "weekendButWorkingDay":buban,
  });
}

function getDayInfo(startDate){
    if(!isValidDate(startDate)){
        return errorRes(MSG_WRONF_DATE);
    }

    var start = date.parse(startDate, DATE_FORMAT); 
    let dayDetail = getDayType(start);
    dayDetail.desc = dayDetail.restDesc

    return  okRes(dayDetail);
}
function getMonthRestDays(yearAndMonth){
   if(!yearAndMonth || !REG_VALID_YM.test(yearAndMonth)){
      return errorRes("参数无效");
   }

   let day1 = yearAndMonth + "01";
   let day = date.parse(day1,DATE_FORMAT);
   let currMon = day.getMonth();
   let restDays = [];
   let workButWeekend = [];
   while(true){
       let dateDetail = getDayType(day);
       if(dateDetail.isRestday){
           let r = dateDetail;
           r.desc = dateDetail.restDesc;
           restDays.push(r)
       }else if(dateDetail.isWeekend){
            workButWeekend.push(date.format(day,DATE_FORMAT));
       }

       day = date.addDays(day,1);
       if(currMon != day.getMonth()){
           break;
       }
   }

   return okRes({
    "totalRest":restDays.length,
   "restDays":restDays,
   "totalWorkOnWeekend":workButWeekend.length,
   "workButWeekend":workButWeekend
  });
}

function getEndDay(startDate,workingDays){
    if(!isValidDate(startDate)){
        return errorRes("参数无效");
    }

    var start = date.parse(startDate, DATE_FORMAT);
    
    if(isNaN(start.getTime())){
        return errorRes("参数无效");
    }

    let endDay = start;

    if(workingDays < 0){
        workingDays = Math.abs(workingDays);
    }

    let workingDay = 0;
   let weekEnd = 0;
   let publicRestDay = 0;
   let buban = 0;

    let wkDay = 0;
    while(true){
       let dayDetail = getDayType(endDay);

       if(!dayDetail.isRestday){
         workingDay +=1;
         if(dayDetail.isWeekend){
            buban += 1;
            weekEnd += 1;
         }
      }else{
        if(dayDetail.isWeekend){
            weekEnd += 1;
        }else{
            publicRestDay += 1;
        }
      }

      if(!dayDetail.isRestday){
        wkDay += 1;
      }

      if(wkDay < workingDays){
        endDay = date.addDays(endDay,1);
      }else{
          break;
      }
    }

    return okRes({
        "endDate": date.format(endDay,DATE_FORMAT),
        "workingDay": workingDay,
        "weekEnd": weekEnd,
        "publicRestDay": publicRestDay,
        "weekendButWorkingDay":buban,
      });
}

function regist(router){
    router.post('/workingdays', (req, res) => {
        res.json(getWorkingDays(req.body.start,req.body.end));
    });
    
    router.post('/endday', (req, res) => {
        let days = parseInt(req.body.days);
        res.json(getEndDay(req.body.start,days));
    });
    
    router.get('/monthrestdays/:yearAndMonth', (req, res) => {
        res.json(getMonthRestDays(req.params.yearAndMonth));
    });
    
    router.get('/day/:day', (req, res) => {
        res.json(getDayInfo(req.params.day));
    });
}

module.exports = {
    regist:regist
};