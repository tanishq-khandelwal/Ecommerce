import { hasuraClient } from "../config/hasuraClient.js";

import { GET_PRODUCTS, CREATE_PRODUCT } from "../queries/product.queries.js";

export const fetchProducts = async (req, res) => {
  try {
    const response = await hasuraClient.request(GET_PRODUCTS);
    const p=response.products;
    res.status(200).json(p)

    console.log(p);
  } catch (err) {
    console.error("An Error Occured", err);

    res.status(500).send("Internal Server Error");
  }
};

export const addProducts = async (req, res) => {
  const { category_id, name, description, price, stock_quantity, image_url } =req.body;

  if (!category_id || !name || !description || !price || !stock_quantity || !image_url)
    {
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

    const data = await hasuraClient.request(CREATE_PRODUCT, { product });

    res.status(200).json({
      success:true,
      message: "Product Added Successfully",
      data,
    });
  } catch (err) {
    console.error("An Error Occured", err);

    res.status(500).send("Internal Server Error");
  }
};
