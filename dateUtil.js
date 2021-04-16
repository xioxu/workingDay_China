var dateUtil = {
    format:function(d){// 20210401
      return String(d.getFullYear())  + String(d.getMonth() + 1).padStart(2, '0')+ String(d.getDate()).padStart(2, '0');
    },
    parse:function(dateStr){// 20210401
        if(!dateStr || dateStr.length != 8){
            return new Date(NaN);
        }

        let year = dateStr.substring(0,4);
        let mon = dateStr.substring(4,6);
        let day = dateStr.substring(6,8);
        return new Date(parseInt(year),parseInt(mon)-1,parseInt(day));
    },
    addDays:function(date,days){
        date.setDate(date.getDate() + days);
        return date;
    }
};

module.exports = dateUtil;