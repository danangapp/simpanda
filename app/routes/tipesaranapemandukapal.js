module.exports = app => {
    const tipesaranapemandukapal = require("../controllers/tipesaranapemandukapal.js");

    // Create a new TipeSaranaPemanduKapal
    app.post("/tipesaranapemandukapal", tipesaranapemandukapal.create);

    // Retrieve all TipeSaranaPemanduKapals
    app.get("/tipesaranapemandukapal", tipesaranapemandukapal.findAll);

    // View Design TipeSaranaPemanduKapals
    app.options("/tipesaranapemandukapal", tipesaranapemandukapal.design);

    // Retrieve a single TipeSaranaPemanduKapal with id
    app.get("/tipesaranapemandukapal/:id", tipesaranapemandukapal.findOne);

    // Update a TipeSaranaPemanduKapal with id
    app.put("/tipesaranapemandukapal/:id", tipesaranapemandukapal.update);

    // Delete a TipeSaranaPemanduKapal with id
    app.delete("/tipesaranapemandukapal/:id", tipesaranapemandukapal.delete);

    // Create a new TipeSaranaPemanduKapal
    app.delete("/tipesaranapemandukapal", tipesaranapemandukapal.deleteAll);
};
