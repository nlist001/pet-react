import useSWR, { useSWRConfig } from "swr"
export default <T>(key:string) =>{
    const { mutate } = useSWRConfig()
    
    return {
        set(newData:T): void { 
            mutate(key, newData, { revalidate: false }) 
        },
        get():T{
            const {data}= useSWR(key) 
             return data
        }
    }
}