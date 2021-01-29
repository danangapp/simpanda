module.exports = app => {
    const evaluasipelimpahan = require("../controllers/evaluasipelimpahan.js");

    // Create a new EvaluasiPelimpahan
    app.post("/evaluasipelimpahan", evaluasipelimpahan.create);

    // Retrieve all EvaluasiPelimpahans
    app.get("/evaluasipelimpahan", evaluasipelimpahan.findAll);

    // Retrieve a single EvaluasiPelimpahan with id
    app.get("/evaluasipelimpahan/:id", evaluasipelimpahan.findOne);

    // Update a EvaluasiPelimpahan with id
    app.put("/evaluasipelimpahan/:id", evaluasipelimpahan.update);

    // Delete a EvaluasiPelimpahan with id
    app.delete("/evaluasipelimpahan/:id", evaluasipelimpahan.delete);

    // Create a new EvaluasiPelimpahan
    app.delete("/evaluasipelimpahan", evaluasipelimpahan.deleteAll);
};
