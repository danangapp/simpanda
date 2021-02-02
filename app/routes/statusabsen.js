module.exports = app => {
    const statusabsen = require("../controllers/statusabsen.js");

    // Create a new StatusAbsen
    app.post("/statusabsen", statusabsen.create);

    // Retrieve all StatusAbsens
    app.get("/statusabsen", statusabsen.findAll);

    // Retrieve a single StatusAbsen with id
    app.get("/statusabsen/:id", statusabsen.findOne);

    // Update a StatusAbsen with id
    app.put("/statusabsen/:id", statusabsen.update);

    // Delete a StatusAbsen with id
    app.delete("/statusabsen/:id", statusabsen.delete);

    // Create a new StatusAbsen
    app.delete("/statusabsen", statusabsen.deleteAll);
};
