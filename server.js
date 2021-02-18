const express = require("express");
const bodyParser = require("body-parser");
const formidableMiddleware = require('express-formidable');
var cors = require('cors')
require('dotenv').config();

const app = express();
app.use(formidableMiddleware());
app.use(cors())

// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  formidableMiddleware({
    encoding: 'utf-8',
    uploadDir: './',
    multiples: true,
  })
)
app.use(express.static(__dirname + '/files'));

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTION')
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization')
  res.header('Access-Control-Request-Method', '*')
  next()
})
// simple route
app.get("/", (req, res) => {
  res.json({ message: "Simpanda Application" });
});

require("./app/routes/action")(app);
require("./app/routes/activitylog")(app);
require("./app/routes/approvalstatus")(app);
require("./app/routes/armadaschedule")(app);
require("./app/routes/assetkapal")(app);
require("./app/routes/assetrumahdinas")(app);
require("./app/routes/assetstasiunequipment")(app);
require("./app/routes/cabang")(app);
require("./app/routes/dokumenkapal")(app);
require("./app/routes/enable")(app);
require("./app/routes/evaluasipelimpahan")(app);
require("./app/routes/investigasiinsiden")(app);
require("./app/routes/kondisi")(app);
require("./app/routes/kondisiumum")(app);
require("./app/routes/mstcabang")(app);
require("./app/routes/mstpemeriksaankapalcheck")(app);
require("./app/routes/mstrole")(app);
require("./app/routes/msttipeasset")(app);
require("./app/routes/msttipepersonil")(app);
require("./app/routes/panduschedule")(app);
require("./app/routes/pemeriksaankapal")(app);
require("./app/routes/pemeriksaankapalcheck")(app);
require("./app/routes/personil")(app);
require("./app/routes/role")(app);
require("./app/routes/saranabantupemandu")(app);
require("./app/routes/saranabantupemandukapal")(app);
require("./app/routes/saranabantupemandupersonil")(app);
require("./app/routes/sertifikat")(app);
require("./app/routes/statusabsen")(app);
require("./app/routes/statusevaluasipelimpahan")(app);
require("./app/routes/statusijazah")(app);
require("./app/routes/statusinvestigasiinsiden")(app);
require("./app/routes/statuskepegawaian")(app);
require("./app/routes/tipeasset")(app);
require("./app/routes/tipecert")(app);
require("./app/routes/tipepersonil")(app);
require("./app/routes/tipesaranapemandukapal")(app);
require("./app/routes/tipestasiun")(app);
require("./app/routes/user")(app);
require("./app/routes/usergroup")(app);

// set port, listen for requests
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
