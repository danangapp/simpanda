var moment = require('moment');
var mv = require('mv');

// var oracledb = require('oracledb');
// const dbConfig = require('../config/dbconfig');
// oracledb.initOracleClient({ libDir: 'D:\\tools\\instantclient_19_10' });
// oracledb.autoCommit = true

moment.updateLocale(moment.locale(), { invalidDate: null })
module.exports = {
    toDate: function (str) {
        var dateString = str;
        var dateObj = new Date(dateString);
        var momentObj = moment(dateObj);
        var momentString = momentObj.format('YYYY-MM-DD'); // 2016-07-15
        return momentString;
    },
    uploadFile: function (folders, files, updateTo) {
        var str = files.path;
        var d = new Date();
        var n = d.getTime();

        var str = files.type;
        var resl = str.split("/");
        const ext = '.' + resl[1];

        const path = './files/';
        updateTo = folders + '/' + n + ext;
        mv(files.path, path + updateTo, function (err) {
            if (err) {
                console.log(err);
                throw err;
            }
        });
        return updateTo;
    },
    uploadFile64: function (folders, files) {
        var str = files.path;
        var d = new Date();
        var n = d.getTime();

        const ext = "." + files.split(';')[0].split('/')[1].toLowerCase();

        const path = './files/';
        var updateTo = folders + '/' + n + ext;

        var base64Data = files.replace(/^data:image\/jpg;base64,/, "");
        base64Data = base64Data.replace(/^data:image\/JPG;base64,/, "");
        base64Data = base64Data.replace(/^data:image\/png;base64,/, "");
        base64Data = base64Data.replace(/^data:image\/PNG;base64,/, "");
        base64Data = base64Data.replace(/^data:image\/jpeg;base64,/, "");
        base64Data = base64Data.replace(/^data:image\/JPEG;base64,/, "");
        base64Data = base64Data.replace(/^data:application\/pdf;base64,/, "");
        base64Data = base64Data.replace(/^data:application\/PDF;base64,/, "");

        require("fs").writeFile(path + updateTo, base64Data, 'base64', function (err) {
            console.log(err);
        });
        return updateTo;
    }
    // ,select: async function (query, insert = 0) {
    //     let connection;
    //     try {
    //         connection = await oracledb.getConnection(dbConfig);

    //         // console.log(result.rows);
    //         if (insert == 1) {
    //             const result = await connection.execute(
    //                 query,
    //                 { id: { type: oracledb.NUMBER, dir: oracledb.BIND_OUT } }
    //             );

    //             return result;
    //         } else {
    //             const result = await connection.execute(query, [], { outFormat: oracledb.OUT_FORMAT_OBJECT });
    //             return result;
    //         }
    //     } catch (err) {
    //         console.error(err);
    //     } finally {
    //         if (connection) {
    //             try {
    //                 await connection.close();
    //             } catch (err) {
    //                 console.error(err);
    //             }
    //         }
    //     }
    // }
};