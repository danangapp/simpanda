const Dashboard = require("../models/dashboard.js");
const f = require('./function');

exports.statisticresume = (req, res) => {
    Dashboard.getAll(req.query, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving actionnames."
            });
        else res.send(data);
    });
};
