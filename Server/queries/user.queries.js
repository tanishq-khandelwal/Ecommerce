import { gql } from "graphql-request";

export const CREATE_USER = gql`
  mutation SignUp($user: users_insert_input!) {
    insert_users_one(object: $user) {
      first_name,
      user_id
    }
  }
`;
