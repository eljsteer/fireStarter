const { AuthenticationError } = require("apollo-server-express");
const { User, Project } = require("../models");
const { signToken } = require("../utils/auth");

const resolvers = {
  Query: {
    // retrieves a single user 
    user: async (parent, { email }) => {
      return User.findOne({ email }).populate('userProjects');
    },

    // retrieves all users 
    users: async () => {
      return User.find({}).populate('userProjects');
    },

    // retrieves all projects
    userProjects: async () => {
      const projectInfo = await Project.find().sort({ createdAt: -1 });
      console.log(projectInfo);
      return projectInfo;
    },

    // retrieves single project
    singleProject: async (parent, { projectId }) => {
      return Project.findOne({ _id: projectId });
    },

    me: async (parent, args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id }).populate('userProjects');
      }
      throw new AuthenticationError('You need to be logged in!');
    },
  },
  Mutation: {
    // mutation to create a new user
    createUser: async (parent, args) => {
      const user = await User.create(args);
      console.log(user);
      const token = signToken(user);
      return { token, user };
    },

    // mutation to log in 
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError('Incorrect email or password. Please try again');
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError('Incorrect email or password. Please try again');
      }

      const token = signToken(user);

      return { token, user };
    },

    // mutation to add a project 
    addProject: async (parent, { title, description, gitRepo, fundingGoal, currentFunds }, context) => {
      if (context.user) {
        const newProject = await Project.create({
          title, 
          description, 
          gitRepo, 
          fundingGoal, 
          currentFunds
        });

        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { userProjects: newProject._id } }
        );

        return newProject;
      }
      throw new AuthenticationError('You must to be logged in!');
    },

    // mutation to update a project 
    updateProject: async (parent, { projectData }, context) => {
      if (context.user) {
          const updatedProject = await User.findByIdAndUpdate(
              { _id: context.user._id },
              { $push: { userProjects: projectData } },
              { new: true }
          );
  
          return updatedProject;
      }
      throw new AuthenticationError('You must to be logged in!');
    }, 

    // mutation to delete a project
    removeProject: async (parent, { projectId }, context) => {
      if (context.user) {
        return Project.findOneAndUpdate(
          { _id: projectId },
          { new: true }
        );
      }
      throw new AuthenticationError('You must to be logged in!');
    },
  },
};

module.exports = resolvers;
