module.exports = app => {
  const drugController = require("../controllers/drug.controller.js");

  var router = require("express").Router();

  // Create a new Drug
  router.post("/", drugController.create);

  // Retrieve all Drug
  router.get("/", drugController.findAll);

  // Retrieve a single Drug with id
  router.get("/:id", drugController.findOne);

  // Update a Drug with id
  router.put("/:id", drugController.update);

  // Delete a Drug with id
  router.delete("/:id", drugController.delete);

  // Create a new Drug
  router.delete("/", drugController.deleteAll);

  app.use("/api/drug", router);
};
