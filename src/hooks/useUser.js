import { useQuery } from "react-query"
import { toast } from "react-toastify"
import {getUserDetail} from "../api"


const useUser =() => {
    const {data, isLoading, isError, refetch}= useQuery(
        "user",
        async () =>{
            try{
                const userDetail = await getUserDetail();
                return userDetail
            }catch(err){
                if(!err.message.includes("not authenticated")){
                    toast.err("Something went wrong ...")
                }
            }
        },
        {refetchOnWindowFocus: false}
    );
    return {data, isLoading, isError, refetch}
};

export default useUser;


// import { useQuery } from "react-query";
// import { toast } from "react-toastify";
// import getUserDetail from "path-to-getUserDetail"; // Make sure to import the function

// const useUser = () => {
//     const { data, isLoading, isError, refetch } = useQuery(
//         "user",
//         async () => {
//             try {
//                 const userDetail = await getUserDetail();
//                 return userDetail;
//             } catch (err) {
//                 // Handle error appropriately
//                 if (!err.message.includes("not authenticated")) {
//                     // Use the correct method name for the toast
//                     toast.error("Something went wrong...");
//                 }
//                 // Re-throw the error if necessary
//                 throw err;
//             }
//         },
//         {
//             // Options for react-query
//             refetchOnWindowFocus: false,
//         }
//     );

//     return { data, isLoading, isError, refetch };
// };

// export default useUser;
