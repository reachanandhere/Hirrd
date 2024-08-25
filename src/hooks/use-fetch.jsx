import { useSession } from "@clerk/clerk-react";
import { useState } from "react";


const useFetch=(cb, options)=>{
    const {session} = useSession()
    const [data, setData] = useState(undefined)
    const [error, setError] = useState(undefined)
    const [loading, setLoading] = useState(false)

    const fn = async(...args)=>{
        setLoading
        setError(null)

        try {
            const supabaseAccessToken = await session.getToken({
                template: 'supabase'
            })
            const data = await cb(supabaseAccessToken, options, ...args)
            setData(data)
            setError(null)
        }catch(error){
            setError(error)
        }finally{
            setLoading(false)
        }
    }

    return {data, error, loading, fn}
}

export default useFetch;