const { AuthenticationError } = require("apollo-server-express");
const { User, Project } = require("../models");
const { signToken } = require("../utils/auth");
// const stripe = require('stripe')('sk_test_4eC39HqLyjWDarjtT1zdp7dc');

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
    // checkout: async (parent, args, context) => {
    //   const url = new URL(context.headers.referer).origin;
    //   const order = new Order({ products: args.products });
    //   const line_items = [];

    //   const { products } = await order.populate('products');

    //   for (let i = 0; i < products.length; i++) {
    //     const product = await stripe.products.create({
    //       name: products[i].name,
    //       description: products[i].description,
    //       images: [`${url}/images/${products[i].image}`]
    //     });

    //     const price = await stripe.prices.create({
    //       product: product.id,
    //       unit_amount: products[i].price * 100,
    //       currency: 'usd',
    //     });

    //     line_items.push({
    //       price: price.id,
    //       quantity: 1
    //     });
    //   }

    //   const session = await stripe.checkout.sessions.create({
    //     payment_method_types: ['card'],
    //     line_items,
    //     mode: 'payment',
    //     success_url: `${url}/success?session_id={CHECKOUT_SESSION_ID}`,
    //     cancel_url: `${url}/`
    //   });

    //   return { session: session.id };
    // }
  },
  Mutation: {
    // mutation to create a new user
    createUser: async (parent, args) => {
      const user = await User.create(args);
      console.log(user);
      const token = signToken(user);
      return { token, user };
    },

    // mutation to update a project 
    updateUser: async (parent, { updateData }, context) => {
      if (context.user) {
          const updatedUser = await User.findByIdAndUpdate(
              { _id: context.user._id },
              { $set: { ...updateData } },
              { new: true }
          );
            console.log(updatedUser);
          return updatedUser;
      }
      throw new AuthenticationError('You must to be logged in!');
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
          currentFunds,
          userId : context.user._id
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

        const project = await Project.findOne(
          { _id: projectId}
        );

        if (project.userId != context.user._id) {
          throw new AuthenticationError('You can only remove your own project!');
        }

        const deletedProject = await Project.findOneAndDelete(
          { _id: projectId}
        );

        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { userProjects: { projectId }}},
          { new: true }
        );
        return deletedProject;        
      }
      throw new AuthenticationError('You must to be logged in!');
    },
  },
};

module.exports = resolvers;
