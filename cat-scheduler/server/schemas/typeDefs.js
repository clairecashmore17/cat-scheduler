const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type Appointment {
    _id: ID
    pet: Pet
    date: String
    package: String
    user: User
  }

  type Pet {
    _id: ID
    pet_name: String
    breed: String
    age: Int
    user: User
  }

  type User {
    _id: ID
    username: String
    email: String
    phone: String
    appointment: Appointment
    pets: [Pet]
  }

  type Auth {
    token: ID
    user: User
  }

  type Query {
    appointments: [Appointment]
    user: User
    users: [User]

    pet: Pet
    pets(username: String): [Pet]
  }

  type Mutation {
    addAppointment(date: String!, pet: ID!, package: String!): Appointment
    deleteAppointment(appointmentId: ID!): Appointment
    addPet(pet_name: String!, breed: String!, age: Int!): Pet
    addUser(
      username: String!
      email: String!
      password: String!
      phone: String!
      pets: [ID]
    ): Auth
    login(email: String!, password: String!): Auth
  }
`;

module.exports = typeDefs;
