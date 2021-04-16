const { time } = require('console');
const date = require("./dateUtil");//require('date-and-time');
const fs = require('fs');
const DATE_FORMAT = "YYYYMMDD";
const REG_VALID_DATE = /^\d{8}$/;
const REG_VALID_YM = /^\d{6}$/;
const MSG_WRONF_DATE = "无效的日期格式";

var _holidayConf;

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

function dayInfo(isRestDay,isWeekend,restDesc){
    return  {
        "isWeekend": isWeekend,
        "isRestday": isRestDay,
        "restDesc": restDesc
    };
}

function getHolidayConf(){
    if(_holidayConf){
        return _holidayConf;
    }

    var content = fs.readFileSync('./data/holiday.json');
    _holidayConf = JSON.parse(content);
    return _holidayConf;
}

function getDayType(dayValue){
    if(!dayValue || isNaN(dayValue.getTime())){
        return {}
    };
    
    let dateStr = date.format(dayValue,DATE_FORMAT);
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

    return dayInfo(isRestDay,isWeekend,restDesc);
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

    return  okRes({
        "isRestDay":dayDetail.isRestday,
        "isWeekend": dayDetail.isWeekend,
        "desc":dayDetail.restDesc
    });
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
           let r = {
               "date":date.format(day,DATE_FORMAT),
               "desc":dateDetail.restDesc
           };
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