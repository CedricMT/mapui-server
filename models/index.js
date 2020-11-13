const dbConfig = require("../config/db.config.js");

const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = dbConfig.url;
db.patient = require("./patient.model.js")(mongoose);
db.doctor = require("./doctor.model.js")(mongoose);
db.drug = require("./drug.model.js")(mongoose);
db.treatment = require("./treatment.model.js")(mongoose);

module.exports = db;
