module.exports = app => {
  const doctorController = require("../controllers/doctor.controller.js");

  var router = require("express").Router();

  // Create a new Doctor
  router.post("/", doctorController.create);

  // Retrieve all Doctor
  router.get("/", doctorController.findAll);

  // Retrieve a single Doctor with id
  router.get("/:id", doctorController.findOne);

  // Update a Doctor with id
  router.put("/:id", doctorController.update);

  // Delete a Doctor with id
  router.delete("/:id", doctorController.delete);

  // Create a new Doctor
  router.delete("/", doctorController.deleteAll);

  app.use("/api/doctor", router);
};
