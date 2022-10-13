const { Schema, model } = require('mongoose');
const dayJs = require("dayjs");

const ProjectSchema = new Schema({
  title: {
    type: String,
    required: true,
    unique: true,
  },
  overview: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    detault: Date.now(),
    get: (createdAtTime) => dayJs(createdAtTime).format('DD/MM/YYYY-hh:mm'),
  },
  gitRepo: {
    type: String,
    required: true,
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  fundingGoal: {
    type: String,
    required: true,
    unique: true,
  },
}, {
    toJSON: {
      getters: true,
      virtual: true,
    },
    id: false
  }
);

const Project = model('project', ProjectSchema);

module.exports = Project;
