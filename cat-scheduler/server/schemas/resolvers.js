const { AuthenticationError } = require("apollo-server-express");
const { Appointment, Pet, User } = require("../models");
const { signToken } = require("../utils/auth");

// if (process.env.NODE_ENV !== "production") {
//   require("dotenv").config();
// }

const resolvers = {
  Query: {
    appointments: async () => {
      return await Appointment.find().populate("user").populate("pet");
    },
    user: async (parent, args, context) => {
      if (context.user) {
        const user = await User.findById(context.user._id)
          .populate("pets")
          .populate({ path: "appointment", populate: "pet" });

        return user;
      }

      throw new AuthenticationError("Not logged in");
    },
    users: async () => {
      const users = await User.find()
        .populate("pets")
        .populate("appointment")
        .select("-__v -password");
      return users;
    },

    pet: async () => {
      return await Pet.find().populate("user");
    },
    pets: async (parent, { username }) => {
      const params = username ? { username } : {};
      return Pet.find(params).sort({ createdAt: -1 }).populate("user");
    },
  },
  Mutation: {
    addPet: async (parent, args, context) => {
      if (context.user) {
        const pet = await Pet.create({
          ...args,
          user: context.user,
        });
        await User.findByIdAndUpdate(
          { _id: context.user._id },
          { $push: { pets: pet._id } },
          { new: true }
        );
        return pet;
      }

      throw new AuthenticationError("you need to be logged in!");
    },
    addUser: async (parent, args) => {
      const user = await User.create(args);
      return user;
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });
      // If there is no user found with args, throw this error
      if (!user) {
        throw new AuthenticationError("Incorrect credentials");
      }
      const correctPw = await user.isCorrectPassword(password);

      // If the password is not correct
      if (!correctPw) {
        throw new AuthenticationError("Incorrect credentials");
      }
      const token = signToken(user);
      return { token, user };
    },
    addAppointment: async (parent, args, context) => {
      if (context.user) {
        const appointment = await Appointment.create({
          ...args,
          user: context.user,
        });
        await User.findByIdAndUpdate(
          { _id: context.user._id },
          { $push: { appointment: appointment._id } },
          { new: true }
        );
        return appointment;
      }
      throw new AuthenticationError("you need to be logged in!");
    },
    deleteAppointment: async (parent, { appointmentId }) => {
      const deletedAppointment = await Appointment.findByIdAndRemove({
        _id: appointmentId,
      });
      return deletedAppointment;
    },
  },
};

module.exports = resolvers;
