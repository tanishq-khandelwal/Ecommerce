// import dotenv  from "dotenv";
// import {GraphQLClient,gql} from "graphql-request"

// dotenv.config();



// const client=new GraphQLClient(process.env.HASURA_GRAPHQL_URL,{
//     headers: {
//         'x-hasura-admin-secret': process.env.HASURA_ADMIN_SECRET || '', 
//       },
// });

// const getProducts=gql`
// query MyQuery {
//   products(where: {product_id: {}}) {
//     category_id
//     created_at
//     description
//     image_url
//     stock_quantity
//     updated_at
//   }
// }`

// export const fetchProducts=async(req,res)=>{

//     try{
//         const data=await client.request(getProducts);
//         res.status(200).json({
//             message:"success",
//         })
//         console.log(data);
//     }catch(err){
//         console.error('An Error Occured',err);
//     }

// }