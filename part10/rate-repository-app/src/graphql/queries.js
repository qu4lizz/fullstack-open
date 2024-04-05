import { gql } from "@apollo/client";

export const GET_REPOSITORIES = gql`
  query {
    repositories {
      edges {
        cursor
        node {
          fullName
          forksCount
          description
          language
          reviewCount
          ratingAverage
          stargazersCount
        }
      }
    }
  }
`;
