module.exports = app => {
    const statusevaluasipelimpahan = require("../controllers/statusevaluasipelimpahan.js");

    // Create a new StatusEvaluasiPelimpahan
    app.post("/statusevaluasipelimpahan", statusevaluasipelimpahan.create);

    // Retrieve all StatusEvaluasiPelimpahans
    app.get("/statusevaluasipelimpahan", statusevaluasipelimpahan.findAll);

    // Retrieve a single StatusEvaluasiPelimpahan with id
    app.get("/statusevaluasipelimpahan/:id", statusevaluasipelimpahan.findOne);

    // Update a StatusEvaluasiPelimpahan with id
    app.put("/statusevaluasipelimpahan/:id", statusevaluasipelimpahan.update);

    // Delete a StatusEvaluasiPelimpahan with id
    app.delete("/statusevaluasipelimpahan/:id", statusevaluasipelimpahan.delete);

    // Create a new StatusEvaluasiPelimpahan
    app.delete("/statusevaluasipelimpahan", statusevaluasipelimpahan.deleteAll);
};
