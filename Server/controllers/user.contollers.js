import { hasuraClient } from "../config/hasuraClient.js"
import { CREATE_USER } from "../queries/user.queries.js"


export const RegisterUser=async(req,res)=>{

    const {first_name,last_name,address,phone,email,password}=req.body.input.input;

    // console.log(req.body.input.input);

    if(!first_name || !last_name || !address || !phone || !email || !password){
        return res.status(400).json({
            message:"All Fields are Required "
        })
    }

    try{

        const user={
            first_name,
            last_name,
            address,
            phone,
            email,
            password
        }

        const respose=await hasuraClient.request(CREATE_USER,{user});

        const p=respose.insert_users_one.user_id;


        res.status(200).json({
            user_id:p,
        });

        console.log(p);
    }catch(err){
        console.log('An Error Occured',err);

        res.status(400).json({
            message:"Error while Registering the User"
        });
    }
}

