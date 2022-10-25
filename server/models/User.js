const { Schema, model } = require('mongoose');

// variable for bcrypt password hashing
const bcrypt = require('bcrypt');

const Project = require('./Project');

const userSchema = new Schema({
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/.+@.+\..+/, 'Must use a valid email address']
    },
    password: {
      type: String,
      required: true
    },
    firstName: {
      type: String,
      required: true
    },
    lastName: {
      type: String,
      required: true
    },
    github: {
      type: String,
    },
    linkedin: {
      type: String,
    },
    skills: [
      {
        type: String, 
      },
    ], 
    userProjects: [
      {
        type: Schema.Types.ObjectId, 
        ref: 'Project',
      },
    ],    
  },
  {
    toJSON: {
      virtuals: true,
    },
  }
);

// hash user password
userSchema.pre('save', async function (next) {
  if (this.isNew || this.isModified('password')) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }

  next();
});

// custom method to compare and validate password for logging in
userSchema.methods.isCorrectPassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

// when we query a user, we'll also get another field called `projectCount` with the number of current projects we have
userSchema.virtual('projectCount').get(function () {
  return this.projects.length;
});

const User = model('user', userSchema);

module.exports = User;
