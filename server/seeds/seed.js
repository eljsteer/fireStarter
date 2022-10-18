const db = require('../config/connection');
const { Project, User } = require('../models');
const userData = require('./userData.json');
const projectData = require('./projectData.json');


db.once('open', async () => {
  try {
    await Project.deleteMany({});
    await User.deleteMany({});

    let userInfo = await User.create(userData);
    console.log(userInfo);

    for (let i = 0; i < projectData.length; i++) {
      const { _id, userId } = await Project.create({...projectData[i], userId: userInfo[Math.floor(Math.random() * userInfo.length)]});
      const user = await User.findOneAndUpdate(
        { _id: userId },
        {
          $addToSet: {
            userProjects: _id,
          },
        }
      );
    }
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
  
  console.log('Technologies seeded!');
  process.exit(0);
});
