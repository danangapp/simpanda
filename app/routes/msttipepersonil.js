module.exports = app => {
    const msttipepersonil = require("../controllers/msttipepersonil.js");

    // Create a new MstTipePersonil
    app.post("/msttipepersonil", msttipepersonil.create);

    // Retrieve all MstTipePersonils
    app.get("/msttipepersonil", msttipepersonil.findAll);

    // Retrieve a single MstTipePersonil with id
    app.get("/msttipepersonil/:id", msttipepersonil.findOne);

    // Update a MstTipePersonil with id
    app.put("/msttipepersonil/:id", msttipepersonil.update);

    // Delete a MstTipePersonil with id
    app.delete("/msttipepersonil/:id", msttipepersonil.delete);

    // Create a new MstTipePersonil
    app.delete("/msttipepersonil", msttipepersonil.deleteAll);
};
