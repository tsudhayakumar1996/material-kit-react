import { useState, useEffect } from "react"
import { getAxios } from "../axios/fetchHelpers";

export const usePostsGet = (pageNumber) => {
    
    const [loading, setloading] = useState(false);
    const [error, seterror] = useState(false);
    const [hasMore, sethasMore] = useState(false);
    const [posts, setposts] = useState([])

    useEffect(() => { 
        
        setloading(true);
        seterror(false);

        async function fetchData() {
            getAxios(`/posters?filter={}&range=[${pageNumber},20]&sort=["created_at","DESC"]`).then(res => {    
                setposts(prev => [...prev, ...res?.data?.data]);
                sethasMore(res?.data?.data.length > 0);
                setloading(false);
            }).catch(err => {
                setloading(false);
                seterror(true);
            });
        }

        fetchData();       

    }, [pageNumber, setposts])

    return { loading, error, hasMore, posts };  
};