const db = require("../models/index.js");
const Drug = db.drug;

// Create and Save a new Drug
exports.create = (req, res) => {
  // Create a Drug
  console.log(req.body);
  const drug = new Drug(req.body);

  // Save Drug in the database
  drug
    .save(drug)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Drug."
      });
    });
};

// Retrieve all Drugs from the database.
exports.findAll = (req, res) => {
  var condition = {};

  Drug.find(condition)
    .then(data => {
      console.log(data);
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving drugs."
      });
    });
};

// Find a single Drug with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Drug.findById(id)
    .then(data => {
      if (!data)
        res.status(404).send({ message: "Not found Drug with id " + id });
      else res.send(data);
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Error retrieving Drug with id=" + id });
    });
};

// Update a Drug by the id in the request
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!"
    });
  }

  const id = req.params.id;

  Drug.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Drug with id=${id}. Maybe Drug was not found!`
        });
      } else res.send({ message: "Drug was updated successfully." });
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Drug with id=" + id
      });
    });
};

// Delete a Drug with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Drug.findByIdAndRemove(id, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Drug with id=${id}. Maybe Drug was not found!`
        });
      } else {
        res.send({
          message: "Drug was deleted successfully!"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Drug with id=" + id
      });
    });
};

// Delete all Drugs from the database.
exports.deleteAll = (req, res) => {
  Drug.deleteMany({})
    .then(data => {
      res.send({
        message: `${data.deletedCount} Drugs were deleted successfully!`
      });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all drugs."
      });
    });
};

