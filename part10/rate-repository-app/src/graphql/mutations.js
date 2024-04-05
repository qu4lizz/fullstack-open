import { gql } from "@apollo/client";

export const typeDefs = gql`
  input AuthenticateInput {
    username: String!
    password: String!
  }
`;

export const SIGN_IN = gql`
  mutation Mutation($credentials: AuthenticateInput) {
    authenticate(credentials: $credentials) {
      accessToken
    }
  }
`;
