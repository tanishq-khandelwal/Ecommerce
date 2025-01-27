import pkg from "@apollo/client";
const { gql } = pkg;

export const GET_PRODUCTS = gql`
  query GetProducts {
    products(where: { product_id: {} }) {
      category_id
      created_at
      description
      image_url
      stock_quantity
      updated_at
      name
      price
      product_id
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
