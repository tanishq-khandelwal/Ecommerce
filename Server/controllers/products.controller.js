import { apolloClient } from "../config/hasuraClient.js";
import { GET_PRODUCTS, CREATE_PRODUCT } from "../queries/product.queries.js";

export const fetchProducts = async (req, res) => {
  try {
    const { data } = await apolloClient.query({
      query: GET_PRODUCTS,
    });
    const products = data.products;
    res.status(200).json(products);

    console.log(products);
  } catch (err) {
    console.error("An Error Occurred", err);
    res.status(500).send("Internal Server Error");
  }
};

export const addProducts = async (req, res) => {
  const { category_id, name, description, price, stock_quantity, image_url } =
    req.body;

  if (
    !category_id ||
    !name ||
    !description ||
    !price ||
    !stock_quantity ||
    !image_url
  ) {
    return res.status(400).json({
      message: "All fields are required",
    });
  }

  try {
    const product = {
      category_id,
      name,
      description,
      price,
      stock_quantity,
      image_url,
    };

    const { data } = await apolloClient.mutate({
      mutation: CREATE_PRODUCT,
      variables: { product },
    });

    res.status(200).json({
      success: true,
      message: "Product Added Successfully",
      data,
    });
  } catch (err) {
    console.error("An Error Occurred", err);
    res.status(500).send("Internal Server Error");
  }
};
