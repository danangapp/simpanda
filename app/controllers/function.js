var moment = require('moment');
moment.updateLocale(moment.locale(), { invalidDate: null })
module.exports = {
    toDate: function (str) {
        var dateString = str;
        var dateObj = new Date(dateString);
        var momentObj = moment(dateObj);
        var momentString = momentObj.format('YYYY-MM-DD'); // 2016-07-15
        return momentString;
    }
};