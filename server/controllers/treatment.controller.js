const db = require("../models/index.js");
const Treatment = db.treatment;

// Create and Save a new Treatment
exports.create = (req, res) => {
  // Create a Treatment
  const treatment = new Treatment(req.body);

  // Save Treatment in the database
  treatment
    .save(treatment)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Treatment."
      });
    });
};

// Retrieve all Treatments from the database.
exports.findAll = (req, res) => {
  const filter = req.query || {};

  Treatment.find(filter).populate('doctor')
    .then(data => {
      console.log(data);
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving treatments."
      });
    });
};

// Find a single Treatment with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Treatment.findById(id)
    .then(data => {
      if (!data)
        res.status(404).send({ message: "Not found Treatment with id " + id });
      else res.send(data);
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Error retrieving Treatment with id=" + id });
    });
};

// Find a multiple Treatment with an ids array
exports.findMultipleId = (req, res) => {
  const filter = req.query || {};

  if (!filter.ids) {
    throw new Error("Cannot request db for Treatment, ids params is missing.")
  }

  Treatment.find().where('_id').in(filter.ids)
    .then(data => {
      console.log(data);
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving treatment."
      });
    });
}

// Update a Treatment by the id in the request
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!"
    });
  }

  const id = req.params.id;

  Treatment.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Treatment with id=${id}. Maybe Treatment was not found!`
        });
      } else res.send({ message: "Treatment was updated successfully." });
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Treatment with id=" + id
      });
    });
};

// Delete a Treatment with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Treatment.findByIdAndRemove(id, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Treatment with id=${id}. Maybe Treatment was not found!`
        });
      } else {
        res.send({
          message: "Treatment was deleted successfully!"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Treatment with id=" + id
      });
    });
};

// Delete all Treatments from the database.
exports.deleteAll = (req, res) => {
  Treatment.deleteMany({})
    .then(data => {
      res.send({
        message: `${data.deletedCount} Treatments were deleted successfully!`
      });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all treatments."
      });
    });
};