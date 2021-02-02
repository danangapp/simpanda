module.exports = app => {
    const saranabantupemandukapal = require("../controllers/saranabantupemandukapal.js");

    // Create a new SaranaBantuPemanduKapal
    app.post("/saranabantupemandukapal", saranabantupemandukapal.create);

    // Retrieve all SaranaBantuPemanduKapals
    app.get("/saranabantupemandukapal", saranabantupemandukapal.findAll);

    // View Design SaranaBantuPemanduKapals
    app.options("/saranabantupemandukapal", saranabantupemandukapal.design);

    // Retrieve a single SaranaBantuPemanduKapal with id
    app.get("/saranabantupemandukapal/:id", saranabantupemandukapal.findOne);

    // Update a SaranaBantuPemanduKapal with id
    app.put("/saranabantupemandukapal/:id", saranabantupemandukapal.update);

    // Delete a SaranaBantuPemanduKapal with id
    app.delete("/saranabantupemandukapal/:id", saranabantupemandukapal.delete);

    // Create a new SaranaBantuPemanduKapal
    app.delete("/saranabantupemandukapal", saranabantupemandukapal.deleteAll);
};
