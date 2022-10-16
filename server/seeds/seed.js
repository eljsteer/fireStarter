const db = require('../config/connection');
const { Project, User } = require('../models');

const userData = require('./userData.json');
const projectData = require('./projectData.json');


db.once('open', async () => {
  await Project.deleteMany({});
  await User.deleteMany({});

  const projects = await Project.insertMany(projectData);
  const users = await User.insertMany(userData);


  console.log('Technologies seeded!');
  process.exit(0);
});
