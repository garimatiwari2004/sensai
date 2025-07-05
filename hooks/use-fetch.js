import { set } from "react-hook-form";
import { toast } from "sonner";

const {useState}=require("react");

const useFetch=(cb)=>{
    const [data, setData] = useFormState(undefined);
    const [loading, setLoading] = useState(null);   
    const [error, setError] = useState(null);

    const fn=async()=>{
        setLoading(treu);
        setError(null);


        try {
            const response=await cb(...args);
            setData(response);
            setError(null);
            
        } catch (error) {
            setError(error);
            toast.error(error.message);
           
            
        }
        finally{
            setLoading(false);
        }

    }
    return {data, loading, error, fn};

}

export default useFetch;