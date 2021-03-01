module.exports = app => {
    const dashboard = require("../controllers/dashboard.js");

    app.get("/dashboard/statisticresume", dashboard.statisticresume);
    app.get("/dashboard/cetivicatevalidity", dashboard.cetivicatevalidity);

};
