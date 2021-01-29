module.exports = app => {
    const mstcabang = require("../controllers/mstcabang.js");

    // Create a new MstCabang
    app.post("/mstcabang", mstcabang.create);

    // Retrieve all MstCabangs
    app.get("/mstcabang", mstcabang.findAll);

    // Retrieve a single MstCabang with id
    app.get("/mstcabang/:id", mstcabang.findOne);

    // Update a MstCabang with id
    app.put("/mstcabang/:id", mstcabang.update);

    // Delete a MstCabang with id
    app.delete("/mstcabang/:id", mstcabang.delete);

    // Create a new MstCabang
    app.delete("/mstcabang", mstcabang.deleteAll);
};
