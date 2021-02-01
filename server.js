const express = require("express");
const bodyParser = require("body-parser");
require('dotenv').config();

const app = express();

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Simpanda Application" });
});

require("./app/routes/activitylog.js")(app);
require("./app/routes/armadaschedule.js")(app);
require("./app/routes/assetkapal.js")(app);
require("./app/routes/assetrumahdinas.js")(app);
require("./app/routes/assetstasiunequipment.js")(app);
require("./app/routes/evaluasipelimpahan.js")(app);
require("./app/routes/investigasiinsiden.js")(app);
require("./app/routes/mstcabang.js")(app);
require("./app/routes/mstpemeriksaankapalcheck.js")(app);
require("./app/routes/mstrole.js")(app);
require("./app/routes/msttipeasset.js")(app);
require("./app/routes/msttipepersonil.js")(app);
require("./app/routes/panduschedule.js")(app);
require("./app/routes/pemeriksaankapal.js")(app);
require("./app/routes/personil.js")(app);
require("./app/routes/saranabantupemandu.js")(app);
require("./app/routes/saranabantupemandukapal.js")(app);
require("./app/routes/saranabantupemandupersonil.js")(app);
require("./app/routes/sertifikat.js")(app);
require("./app/routes/user.js")(app);
require("./app/routes/usergroup.js")(app);

// set port, listen for requests
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
