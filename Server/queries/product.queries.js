import { gql } from "graphql-request";

export const GET_PRODUCTS = gql`
  query GetProducts($id: Int!) {
    products(where: { product_id: { _eq: $id } }) {
      category_id
      created_at
      description
      image_url
      stock_quantity
      updated_at
    }
  }
`;

export const CREATE_PRODUCT = gql`
  mutation CreateProduct($product: products_insert_input!) {
    insert_products_one(object: $product) {
      product_id
      description
    }
  }
`;
