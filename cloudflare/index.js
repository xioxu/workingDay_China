var dateUtil = {
    format:function(d){// 20210401
      return String(d.getFullYear())  + String(new Date().getMonth() + 1).padStart(2, '0')+ String(new Date().getDate()).padStart(2, '0');
    },
    parse:function(dateStr){// 20210401
        if(!dateStr || dateStr.length != 8){
            return new Date(NaN);
        }

        let year = dateStr.substring(0,4);
        let mon = dateStr.substring(5,6);
        let day = dateStr.substring(7,8);
        return new Date(parseInt(year),parseInt(mon)-1,parseInt(day));
    },
    addDays:function(date,days){
        date.setDate(date.getDate() + days);
        return date;
    }
};

const hConf = {
    "2021":{
        "rest": {
        "0101":{"endDate":"0103","rest":3,"desc":"元旦"},
        "0211":{"endDate":"0217","rest":7,"desc":"春节"},
        "0403":{"endDate":"0405","rest":3,"desc":"清明节"},
        "0501":{"endDate":"0505","rest":5,"desc":"劳动节"},
        "0612":{"endDate":"0614","rest":3,"desc":"端午节"},
        "0919":{"endDate":"0921","rest":3,"desc":"中秋节"},
        "1001":{"endDate":"1007","rest":7,"desc":"国庆节"}
            },
        "workingdayOnWeekend":["0207","0220","0425","0508","0918","0926","1009"]
    },
    "2020":{
        "rest": {
        "0101":{"endDate":"0101","rest":1,"desc":"元旦"},
        "0124":{"endDate":"0130","rest":7,"desc":"春节"},
        "0404":{"endDate":"0406","rest":3,"desc":"清明节"},
        "0501":{"endDate":"0505","rest":5,"desc":"劳动节"},
        "0625":{"endDate":"0627","rest":3,"desc":"端午节"},
        "1001":{"endDate":"1008","rest":8,"desc":"中秋节、国庆节"}
            },
        "workingdayOnWeekend":["0119","0201","0426","0509","0628","0927","1010"]
    },
 "2019":{
        "rest": {
        "0101":{"endDate":"0101","rest":1,"desc":"元旦"},
        "0204":{"endDate":"0210","rest":7,"desc":"春节"},
        "0405":{"endDate":"0405","rest":1,"desc":"清明节"},
        "0501":{"endDate":"0504","rest":4,"desc":"劳动节"},
        "0607":{"endDate":"0607","rest":1,"desc":"端午节"},
        "0913":{"endDate":"0913","rest":1,"desc":"中秋节"},
        "1001":{"endDate":"1007","rest":7,"desc":"国庆节"}
            },
        "workingdayOnWeekend":["0202","0203","0428","0505","0929","1012"]
    },
"2018":{
        "rest": {
        "0101":{"endDate":"0101","rest":1,"desc":"元旦"},
        "0215":{"endDate":"0221","rest":7,"desc":"春节"},
        "0405":{"endDate":"0407","rest":3,"desc":"清明节"},
        "0429":{"endDate":"0501","rest":3,"desc":"劳动节"},
        "0618":{"endDate":"0618","rest":1,"desc":"端午节"},
        "0924":{"endDate":"0924","rest":1,"desc":"中秋节"},
        "1001":{"endDate":"1007","rest":7,"desc":"国庆节"},
        "1230":{"endDate":"1231","rest":2,"desc":"元旦"}
            },
        "workingdayOnWeekend":["0211","0224","0408","0428","0929","0930","1229"]
    },
"2017":{
        "rest": {
        "0102":{"endDate":"0102","rest":1,"desc":"元旦"},
        "0127":{"endDate":"0202","rest":7,"desc":"春节"},
        "0402":{"endDate":"0404","rest":3,"desc":"清明节"},
        "0501":{"endDate":"0501","rest":1,"desc":"劳动节"},
        "0528":{"endDate":"0530","rest":3,"desc":"端午节"},
        "1001":{"endDate":"1008","rest":8,"desc":"中秋节、国庆节"}
            },
        "workingdayOnWeekend":["0122","0204","0401","0527","0930"]
    },
"2016":{
        "rest": {
        "0101":{"endDate":"0101","rest":1,"desc":"元旦"},
        "0207":{"endDate":"0213","rest":7,"desc":"春节"},
        "0404":{"endDate":"0404","rest":1,"desc":"清明节"},
        "0502":{"endDate":"0502","rest":1,"desc":"劳动节"},
        "0609":{"endDate":"0611","rest":3,"desc":"端午节"},
        "0915":{"endDate":"0917","rest":3,"desc":"中秋节"},
        "1001":{"endDate":"1007","rest":7,"desc":"国庆节"}
            },
        "workingdayOnWeekend":["0206","0214","0612","0918","1008","1009"]
    },
"2015":{
        "rest": {
        "0101":{"endDate":"0103","rest":3,"desc":"元旦"},
        "0218":{"endDate":"0224","rest":7,"desc":"春节"},
        "0406":{"endDate":"0406","rest":1,"desc":"清明节"},
        "0501":{"endDate":"0501","rest":1,"desc":"劳动节"},
        "0622":{"endDate":"0622","rest":1,"desc":"端午节"},
        "0903":{"endDate":"0905","rest":3,"desc":"反法西斯战争胜利70周年"},
        "0927":{"endDate":"0927","rest":1,"desc":"中秋节"},
        "1001":{"endDate":"1007","rest":7,"desc":"国庆节"}
            },
        "workingdayOnWeekend":["0104","0215","0228","0906","1010"]
    },
"2014":{
        "rest": {
        "0101":{"endDate":"0101","rest":1,"desc":"元旦"},
        "0131":{"endDate":"0206","rest":7,"desc":"春节"},
        "0407":{"endDate":"0407","rest":1,"desc":"清明节"},
        "0501":{"endDate":"0503","rest":3,"desc":"劳动节"},
        "0602":{"endDate":"0602","rest":1,"desc":"端午节"},
        "0908":{"endDate":"0908","rest":1,"desc":"中秋节"},
        "1001":{"endDate":"1007","rest":7,"desc":"国庆节"}
            },
        "workingdayOnWeekend":["0126","0208","0504","0928","1011"]
    },
"2013":{
        "rest": {
        "0101":{"endDate":"0103","rest":3,"desc":"元旦"},
        "0209":{"endDate":"0215","rest":7,"desc":"春节"},
        "0404":{"endDate":"0406","rest":3,"desc":"清明节"},
        "0429":{"endDate":"0501","rest":3,"desc":"劳动节"},
        "0610":{"endDate":"0612","rest":3,"desc":"端午节"},
        "0919":{"endDate":"0921","rest":3,"desc":"中秋节"},
        "1001":{"endDate":"1007","rest":7,"desc":"国庆节"}
            },
        "workingdayOnWeekend":["0105","0106","0216","0217","0407","0427","0428","0608","0609","0922","0929","1012"]
    },
"2012":{
        "rest": {
        "0101":{"endDate":"0103","rest":3,"desc":"元旦"},
        "0122":{"endDate":"0128","rest":7,"desc":"春节"},
        "0402":{"endDate":"0404","rest":3,"desc":"清明节"},
        "0429":{"endDate":"0501","rest":3,"desc":"劳动节"},
        "0622":{"endDate":"0624","rest":3,"desc":"端午节"},
        "0930":{"endDate":"1007","rest":8,"desc":"中秋节、国庆节"}
            },
        "workingdayOnWeekend":["0121","0129","0331","0401","0428","0929"]
    },
"2011":{
        "rest": {
        "0101":{"endDate":"0103","rest":3,"desc":"元旦"},
        "0202":{"endDate":"0208","rest":7,"desc":"春节"},
        "0403":{"endDate":"0405","rest":3,"desc":"清明节"},
        "0430":{"endDate":"0502","rest":3,"desc":"劳动节"},
        "0604":{"endDate":"0606","rest":3,"desc":"端午节"},
        "0910":{"endDate":"0912","rest":3,"desc":"中秋节"},
        "1001":{"endDate":"1007","rest":7,"desc":"国庆节"}
            },
        "workingdayOnWeekend":["0130","0212","0402","1008","1009","1231"]
    },
"2010":{
        "rest": {
        "0101":{"endDate":"0103","rest":3,"desc":"元旦"},
        "0213":{"endDate":"0219","rest":7,"desc":"春节"},
        "0403":{"endDate":"0405","rest":3,"desc":"清明节"},
        "0501":{"endDate":"0503","rest":3,"desc":"劳动节"},
        "0614":{"endDate":"0616","rest":3,"desc":"端午节"},
        "0922":{"endDate":"0924","rest":3,"desc":"中秋节"},
        "1001":{"endDate":"1007","rest":7,"desc":"国庆节"}
            },
        "workingdayOnWeekend":["0220","0221","0612","0613","0919","0925","0926","1009"]
    },
"2009":{
        "rest": {
        "0101":{"endDate":"0103","rest":3,"desc":"元旦"},
        "0125":{"endDate":"0131","rest":7,"desc":"春节"},
        "0404":{"endDate":"0406","rest":3,"desc":"清明节"},
        "0501":{"endDate":"0503","rest":3,"desc":"劳动节"},
        "0528":{"endDate":"0530","rest":3,"desc":"端午节"},
        "1001":{"endDate":"1008","rest":8,"desc":"国庆节"}
            },
        "workingdayOnWeekend":["0104","0124","0201","0531","0927","1010"]
    },
"2008":{
        "rest": {
        "0101":{"endDate":"0101","rest":1,"desc":"元旦"},
        "0206":{"endDate":"0212","rest":7,"desc":"春节"},
        "0404":{"endDate":"0406","rest":3,"desc":"清明节"},
        "0501":{"endDate":"0503","rest":3,"desc":"劳动节"},
        "0607":{"endDate":"0609","rest":3,"desc":"端午节"},
        "0913":{"endDate":"0915","rest":3,"desc":"中秋节"},
        "0929":{"endDate":"1005","rest":7,"desc":"国庆节"}
            },
        "workingdayOnWeekend":["0202","0203","0504"]
    },
"2007":{
        "rest": {
        "0101":{"endDate":"0103","rest":3,"desc":"元旦"},
        "0218":{"endDate":"0224","rest":7,"desc":"春节"},
        "0501":{"endDate":"0507","rest":7,"desc":"劳动节"},
        "1001":{"endDate":"1007","rest":7,"desc":"国庆节"}
            },
        "workingdayOnWeekend":["0217","0225","0428","0429","0929","0930","1229"]
    },
"2006":{
        "rest": {
        "0101":{"endDate":"0103","rest":3,"desc":"元旦"},
        "0129":{"endDate":"0204","rest":7,"desc":"春节"},
        "0501":{"endDate":"0507","rest":7,"desc":"劳动节"},
        "1001":{"endDate":"1007","rest":7,"desc":"国庆节"}
            },
        "workingdayOnWeekend":["0128","0205","0429","0430","0930","1008","1230","1231"]
    },
"2005":{
        "rest": {
        "0101":{"endDate":"0103","rest":3,"desc":"元旦"},
        "0209":{"endDate":"0215","rest":7,"desc":"春节"},
         "0501":{"endDate":"0507","rest":7,"desc":"劳动节"},
        "1001":{"endDate":"1007","rest":7,"desc":"国庆节"}
            },
        "workingdayOnWeekend":["0205","0206","0430","0508","1008","1009","1231"]
    },
"2004":{
        "rest": {
        "0101":{"endDate":"0101","rest":1,"desc":"元旦"},
        "0122":{"endDate":"0128","rest":7,"desc":"春节"},
         "0501":{"endDate":"0507","rest":7,"desc":"劳动节"},
        "1001":{"endDate":"1007","rest":7,"desc":"国庆节"}
            },
        "workingdayOnWeekend":["0117","0118","0508","0509","1009","1010"]
    }
};

const app = {
    get: (endpoint, request,fn) => {
      url = new URL(request.url);
      if (url.pathname === endpoint && request.method === "GET")
        return fn(request);
      return null;
    },
    post: (endpoint, request,fn) => {
      url = new URL(request.url);
      if (url.pathname === endpoint && request.method === "POST")
        return fn(request);
      return null;
    }
  };

  async function handleRequest(request) {
    let lastResponse = app.post("/endday",request, async function () {
        let reqPara = await request.json();
        let nDays = parseInt(reqPara.days)
        return getEndDay(reqPara.start,nDays);
    });

    if (lastResponse) {
        return lastResponse;
    }

   lastResponse =  app.post("/wkdays", request,async function () {
    let reqPara = await request.json();
    return getWorkingDays(reqPara.start,reqPara.end);
   });

   if (lastResponse) {
        return lastResponse;
   }

   return null;
}


function getDayType(dayValue){
    let dateStr = dateUtil.format(dayValue);
     let year =  dateStr.substring(0,4);
     let day =  dateStr.substring(4,8);
     var dayOfWeek = dayValue.getDay();
     var isWeekend = (dayOfWeek === 6) || (dayOfWeek  === 0); // 6 = Saturday, 0 = Sunday

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

    var retV = {
        "isWeekend": isWeekend,
        "isRestday": isRestDay,
        "restDesc": restDesc
    };
    return retV;
}

function getWorkingDays(startDate,endDate){
   let msg = "无效的日期格式";
   if(!startDate || !endDate){
       return errorRes(msg);
   }

   var start = dateUtil.parse(startDate); 
   var end = dateUtil.parse(endDate); 

   if(isNaN(start.getTime()) || isNaN(end.getTime())){
    return errorRes(msg);
   }

   if(start.getTime() > end.getTime()){
       let tmp = start;
       start = end;
       end =start;
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

      start = dateUtil.addDays(start,1);
   }

   return {
     "workingDay": workingDay,
     "weekEnd": weekEnd,
     "publicRestDay": publicRestDay,
     "weekendButWorkingDay":buban,
   };
}

function getEndDay(startDate,workingDays){
    var start = dateUtil.parse(startDate);
    let endDay = start;

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
        endDay = dateUtil.addDays(endDay,1);
      }else{
          break;
      }
    }

    return {
        "endDate": dateUtil.format(endDay,DATE_FORMAT),
        "workingDay": workingDay,
        "weekEnd": weekEnd,
        "publicRestDay": publicRestDay,
        "weekendButWorkingDay":buban,
      };
}


async function handle(request) {
    let res =await handleRequest(request);
    if(!res){
        return new Response("",{ status: 404 });
    }else{
        return new Response(JSON.stringify(res, null, 2), { headers: { 'Content-Type':'application/json' }});
    }
}

addEventListener('fetch', event => {
    event.respondWith(handle(event.request))
})