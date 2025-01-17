import { gql } from "graphql-request";

export const CREATE_USER = gql`
  mutation SignUp($user: users_insert_input!) {
    insert_users_one(object: $user) {
      first_name
      user_id
    }
  }
`;

export const LOGIN = gql`
  query MyQuery($email: String!) {
    users(where: { email: { _eq: $email } }) {
      password
      first_name
      last_name
      user_id
      phone
      role
      carts {
        cart_id
        quantity
        product_id
      }
    }
  }
`;
