import { hasuraClient } from "../config/hasuraClient.js";

import { GET_PRODUCTS,CREATE_PRODUCT } from "../queries/product.queries.js";

export const fetchProducts=async(req,res)=>{

    try{
        const {id}=req.params;
        const data=await hasuraClient.request(GET_PRODUCTS,{id:parseInt(id)});

        res.status(200).json({
            messaage:"Product data fetched Successfully",
            data
        })
    }catch(err){
        console.error('An Error Occured',err);

        res.status(500).send("Internal Server Error");

    }
}