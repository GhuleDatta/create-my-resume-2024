

import { useQuery } from "react-query";
import { toast } from "react-toastify";
import { getTemplates } from "../api"; // Importing the function to fetch templates

const useTemplates = () => {
    const { data, isLoading, isError, refetch } = useQuery(
        "Templates",
        async () => {
            try {
                const templates = await getTemplates();
                console.log("Template",templates);
                return templates;
            } catch (err) {
                console.error(err);
                toast.error('Something went wrong');
                throw err; // Re-throw the error to let react-query handle it
            }
        },
        {refetchOnWindowFocus :false}
    );

    return {
        data,
        isLoading,
        isError,
        refetch,
    };
};

export default useTemplates;
