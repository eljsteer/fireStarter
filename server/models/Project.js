const { Schema, model } = require('mongoose');

const projectSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
});

const Project = model('Project', projectSchema);

module.exports = Project;
